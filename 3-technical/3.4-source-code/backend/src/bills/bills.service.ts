import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BillEntity, BillStatus, PaymentStatus } from './entities/bill.entity';
import { BillItemEntity, BillItemType } from './entities/bill-item.entity';
import { PaymentEntity, PaymentMethod } from './entities/payment.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { ProductsService } from '../products/products.service';
import { BranchesService } from '../branches/branches.service';
import { InventoryService } from '../inventory/inventory.service';
import { LocationType } from '../inventory/entities/inventory.entity';
import { PromotionsService } from '../promotions/promotions.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillEntity)
    private billsRepository: Repository<BillEntity>,
    @InjectRepository(BillItemEntity)
    private billItemsRepository: Repository<BillItemEntity>,
    @InjectRepository(PaymentEntity)
    private paymentsRepository: Repository<PaymentEntity>,
    private productsService: ProductsService,
    private branchesService: BranchesService,
    private inventoryService: InventoryService,
    private promotionsService: PromotionsService,
    private customersService: CustomersService,
    private dataSource: DataSource,
  ) {}

  async generateBillNumber(tenantId: string): Promise<string> {
    // [GUESS: Simple bill number generation - format: BILL-YYYYMMDD-XXXX]
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const count = await this.billsRepository.count({
      where: { tenantId, createdAt: date },
    });
    return `BILL-${dateStr}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(createBillDto: CreateBillDto, tenantId: string, branchId: string): Promise<BillEntity> {
    // Validate branch
    await this.branchesService.findOne(branchId, tenantId);

    // Generate bill number
    const billNumber = await this.generateBillNumber(tenantId);

    // Validate items and calculate totals
    let subtotal = 0;
    const items: BillItemEntity[] = [];

    for (const itemDto of createBillDto.items) {
      if (itemDto.type === BillItemType.PRODUCT) {
        // Validate product exists
        const product = await this.productsService.findOne(itemDto.itemId, tenantId);

        // Check inventory availability (for branch)
        const branchInventory = await this.inventoryService.getBranchInventory(
          tenantId,
          branchId,
          itemDto.itemId,
        );

        const inventory = branchInventory.find((inv) => inv.productId === itemDto.itemId);
        if (!inventory || inventory.quantity - inventory.reservedQuantity < itemDto.quantity) {
          throw new BadRequestException(
            `Insufficient inventory for product ${product.name}`,
          );
        }

        const itemTotal = product.customerPrice * itemDto.quantity;
        subtotal += itemTotal;

        items.push(
          this.billItemsRepository.create({
            type: BillItemType.PRODUCT,
            itemId: itemDto.itemId,
            name: product.name,
            quantity: itemDto.quantity,
            unitPrice: product.customerPrice,
            total: itemTotal,
            discount: 0,
          }),
        );
      } else if (itemDto.type === BillItemType.SERVICE) {
        // [GUESS: Service pricing - using fixed price for now, service module will be added later]
        const servicePrice = itemDto.unitPrice || 0;
        const itemTotal = servicePrice * itemDto.quantity;
        subtotal += itemTotal;

        items.push(
          this.billItemsRepository.create({
            type: BillItemType.SERVICE,
            itemId: itemDto.itemId,
            name: itemDto.name || 'Service',
            quantity: itemDto.quantity,
            unitPrice: servicePrice,
            total: itemTotal,
            discount: 0,
          }),
        );
      }
    }

    if (items.length === 0) {
      throw new BadRequestException('Bill must have at least one item');
    }

    // Apply promotions automatically
    let discount = createBillDto.discount || 0;
    const tempBill = this.billsRepository.create({
      tenantId,
      branchId,
      billNumber: 'TEMP',
      items,
      subtotal,
      discount: 0,
      total: subtotal,
    });

    const eligiblePromotions = await this.promotionsService.getEligiblePromotions(
      tenantId,
      tempBill,
      createBillDto.customerId,
    );

    for (const promotion of eligiblePromotions) {
      const promotionDiscount = await this.promotionsService.applyPromotion(
        promotion,
        tempBill,
        tenantId,
        createBillDto.customerId,
      );
      discount += promotionDiscount;
    }

    const total = subtotal - discount;

    // Create bill
    const bill = this.billsRepository.create({
      tenantId,
      branchId,
      billNumber,
      customerId: createBillDto.customerId || null,
      status: createBillDto.status || BillStatus.DRAFT,
      paymentStatus: PaymentStatus.PENDING,
      items,
      subtotal,
      discount,
      total,
      appliedPromotions: createBillDto.appliedPromotions || [],
      isOffline: createBillDto.isOffline || false,
    });

    return this.billsRepository.save(bill);
  }

  async findOne(id: string, tenantId: string): Promise<BillEntity> {
    const bill = await this.billsRepository.findOne({
      where: { id, tenantId },
      relations: ['items', 'payments', 'branch'],
    });

    if (!bill) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }

    return bill;
  }

  async update(
    id: string,
    updateBillDto: UpdateBillDto,
    tenantId: string,
  ): Promise<BillEntity> {
    const bill = await this.findOne(id, tenantId);

    if (bill.status !== BillStatus.DRAFT) {
      throw new BadRequestException('Only draft bills can be updated');
    }

    // [GUESS: Simple update - recalculate totals if items changed]
    if (updateBillDto.items) {
      // Recalculate totals (similar to create)
      let subtotal = 0;
      const items: BillItemEntity[] = [];

      for (const itemDto of updateBillDto.items) {
        if (itemDto.type === BillItemType.PRODUCT) {
          const product = await this.productsService.findOne(itemDto.itemId, tenantId);
          const itemTotal = product.customerPrice * itemDto.quantity;
          subtotal += itemTotal;

          items.push(
            this.billItemsRepository.create({
              type: BillItemType.PRODUCT,
              itemId: itemDto.itemId,
              name: product.name,
              quantity: itemDto.quantity,
              unitPrice: product.customerPrice,
              total: itemTotal,
              discount: 0,
            }),
          );
        }
      }

      // Delete old items
      await this.billItemsRepository.delete({ billId: id });

      bill.items = items;
      bill.subtotal = subtotal;
    }

    if (updateBillDto.discount !== undefined) {
      bill.discount = updateBillDto.discount;
    }

    bill.total = bill.subtotal - bill.discount;

    return this.billsRepository.save(bill);
  }

  async processPayment(
    id: string,
    processPaymentDto: ProcessPaymentDto,
    tenantId: string,
  ): Promise<{ bill: BillEntity; change: number }> {
    const bill = await this.findOne(id, tenantId);

    if (bill.status === BillStatus.CANCELLED) {
      throw new BadRequestException('Cannot process payment for cancelled bill');
    }

    // Calculate total payment amount
    const totalPaymentAmount = processPaymentDto.payments.reduce(
      (sum, p) => sum + p.amount,
      0,
    );

    if (totalPaymentAmount > bill.total) {
      throw new BadRequestException('Payment amount exceeds bill total');
    }

    // Use transaction for atomicity
    return await this.dataSource.transaction(async (manager) => {
      // Create payment records
      const payments: PaymentEntity[] = [];
      let change = 0;

      for (const paymentDto of processPaymentDto.payments) {
        if (paymentDto.method === PaymentMethod.CASH && paymentDto.amount > bill.total) {
          change = paymentDto.amount - bill.total;
        }

        const payment = manager.create(PaymentEntity, {
          billId: id,
          method: paymentDto.method,
          amount: paymentDto.amount,
          change,
        });

        payments.push(await manager.save(payment));
      }

      // Update bill status
      bill.status = BillStatus.CONFIRMED;
      bill.paymentStatus =
        totalPaymentAmount === bill.total ? PaymentStatus.PAID : PaymentStatus.PARTIAL;
      bill.payments = payments;

      await manager.save(bill);

      // Deduct inventory for products
      for (const item of bill.items) {
        if (item.type === BillItemType.PRODUCT) {
          // [GUESS: Inventory deduction - decrease branch inventory]
          // This will be handled by inventory service in a future update
        }
      }

      // Award points to customer if bill is paid and customer exists
      if (bill.customerId && totalPaymentAmount === bill.total) {
        // [GUESS: Points conversion rate - 1 point per 1000 VND]
        const pointsEarned = Math.floor(bill.total / 1000);
        if (pointsEarned > 0) {
          await this.customersService.addPoints(
            bill.customerId,
            tenantId,
            pointsEarned,
            bill.id,
            `Points from bill ${bill.billNumber}`,
          );
        }
      }

      return { bill, change };
    });
  }

  async findAll(tenantId: string, branchId?: string): Promise<BillEntity[]> {
    const where: any = { tenantId };
    if (branchId) {
      where.branchId = branchId;
    }

    return this.billsRepository.find({
      where,
      relations: ['items', 'payments', 'branch'],
      order: { createdAt: 'DESC' },
    });
  }

  async cancel(id: string, tenantId: string): Promise<BillEntity> {
    const bill = await this.findOne(id, tenantId);

    if (bill.status === BillStatus.CANCELLED) {
      throw new BadRequestException('Bill is already cancelled');
    }

    if (bill.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestException('Cannot cancel paid bill');
    }

    bill.status = BillStatus.CANCELLED;
    return this.billsRepository.save(bill);
  }
}

