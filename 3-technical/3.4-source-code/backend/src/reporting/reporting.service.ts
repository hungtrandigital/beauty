import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { BillEntity, PaymentStatus } from '../bills/entities/bill.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { InventoryEntity } from '../inventory/entities/inventory.entity';
import { PromotionUsageEntity } from '../promotions/entities/promotion-usage.entity';

@Injectable()
export class ReportingService {
  constructor(
    @InjectRepository(BillEntity)
    private billsRepository: Repository<BillEntity>,
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(PromotionUsageEntity)
    private promotionUsageRepository: Repository<PromotionUsageEntity>,
  ) {}

  async getRevenueReport(
    tenantId: string,
    startDate: Date,
    endDate: Date,
    branchId?: string,
  ): Promise<{
    totalRevenue: number;
    totalBills: number;
    averageBillValue: number;
    revenueByBranch: Array<{ branchId: string; revenue: number; bills: number }>;
    revenueByDay: Array<{ date: string; revenue: number; bills: number }>;
  }> {
    const where: any = {
      tenantId,
      status: 'CONFIRMED',
      paymentStatus: PaymentStatus.PAID,
      createdAt: Between(startDate, endDate),
    };

    if (branchId) {
      where.branchId = branchId;
    }

    const bills = await this.billsRepository.find({ where });

    const totalRevenue = bills.reduce((sum, bill) => sum + Number(bill.total), 0);
    const totalBills = bills.length;
    const averageBillValue = totalBills > 0 ? totalRevenue / totalBills : 0;

    // Revenue by branch
    const revenueByBranchMap = new Map<string, { revenue: number; bills: number }>();
    bills.forEach((bill) => {
      const existing = revenueByBranchMap.get(bill.branchId) || { revenue: 0, bills: 0 };
      revenueByBranchMap.set(bill.branchId, {
        revenue: existing.revenue + Number(bill.total),
        bills: existing.bills + 1,
      });
    });

    const revenueByBranch = Array.from(revenueByBranchMap.entries()).map(([branchId, data]) => ({
      branchId,
      ...data,
    }));

    // Revenue by day
    const revenueByDayMap = new Map<string, { revenue: number; bills: number }>();
    bills.forEach((bill) => {
      const date = bill.createdAt.toISOString().split('T')[0];
      const existing = revenueByDayMap.get(date) || { revenue: 0, bills: 0 };
      revenueByDayMap.set(date, {
        revenue: existing.revenue + Number(bill.total),
        bills: existing.bills + 1,
      });
    });

    const revenueByDay = Array.from(revenueByDayMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalRevenue,
      totalBills,
      averageBillValue,
      revenueByBranch,
      revenueByDay,
    };
  }

  async getTopProducts(
    tenantId: string,
    startDate: Date,
    endDate: Date,
    limit: number = 10,
  ): Promise<Array<{ productId: string; name: string; quantity: number; revenue: number }>> {
    // [GUESS: Top products based on bill items - simplified implementation]
    const bills = await this.billsRepository.find({
      where: {
        tenantId,
        status: 'CONFIRMED',
        createdAt: Between(startDate, endDate),
      },
      relations: ['items'],
    });

    const productMap = new Map<
      string,
      { name: string; quantity: number; revenue: number }
    >();

    bills.forEach((bill) => {
      bill.items.forEach((item) => {
        if (item.type === 'PRODUCT') {
          const existing = productMap.get(item.itemId) || {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
          productMap.set(item.itemId, {
            name: item.name,
            quantity: existing.quantity + Number(item.quantity),
            revenue: existing.revenue + Number(item.total),
          });
        }
      });
    });

    return Array.from(productMap.entries())
      .map(([productId, data]) => ({ productId, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  async getTopServices(
    tenantId: string,
    startDate: Date,
    endDate: Date,
    limit: number = 10,
  ): Promise<Array<{ serviceId: string; name: string; quantity: number; revenue: number }>> {
    const bills = await this.billsRepository.find({
      where: {
        tenantId,
        status: 'CONFIRMED',
        createdAt: Between(startDate, endDate),
      },
      relations: ['items'],
    });

    const serviceMap = new Map<
      string,
      { name: string; quantity: number; revenue: number }
    >();

    bills.forEach((bill) => {
      bill.items.forEach((item) => {
        if (item.type === 'SERVICE') {
          const existing = serviceMap.get(item.itemId) || {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
          serviceMap.set(item.itemId, {
            name: item.name,
            quantity: existing.quantity + Number(item.quantity),
            revenue: existing.revenue + Number(item.total),
          });
        }
      });
    });

    return Array.from(serviceMap.entries())
      .map(([serviceId, data]) => ({ serviceId, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  async getInventoryRecommendations(
    tenantId: string,
    branchId?: string,
  ): Promise<Array<{ productId: string; name: string; currentQuantity: number; recommendation: string }>> {
    const where: any = { tenantId };
    if (branchId) {
      where.locationId = branchId;
      where.locationType = 'BRANCH';
    } else {
      where.locationType = 'CENTRAL_WAREHOUSE';
    }

    const inventory = await this.inventoryRepository.find({
      where,
      relations: ['product'],
    });

    return inventory
      .filter((inv) => {
        const available = Number(inv.quantity) - Number(inv.reservedQuantity);
        return available <= Number(inv.lowStockThreshold);
      })
      .map((inv) => ({
        productId: inv.productId,
        name: inv.product?.name || 'Unknown',
        currentQuantity: Number(inv.quantity) - Number(inv.reservedQuantity),
        recommendation: 'Refill inventory - Low stock',
      }));
  }

  async getRevenueTrends(
    tenantId: string,
    days: number = 30,
    branchId?: string,
  ): Promise<{
    trend: 'UP' | 'DOWN' | 'STABLE';
    percentageChange: number;
    currentPeriod: { revenue: number; bills: number };
    previousPeriod: { revenue: number; bills: number };
  }> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const previousEndDate = startDate;
    const previousStartDate = new Date();
    previousStartDate.setDate(previousStartDate.getDate() - days * 2);

    const where: any = {
      tenantId,
      status: 'CONFIRMED',
      paymentStatus: PaymentStatus.PAID,
    };

    if (branchId) {
      where.branchId = branchId;
    }

    const currentBills = await this.billsRepository.find({
      where: {
        ...where,
        createdAt: Between(startDate, endDate),
      },
    });

    const previousBills = await this.billsRepository.find({
      where: {
        ...where,
        createdAt: Between(previousStartDate, previousEndDate),
      },
    });

    const currentRevenue = currentBills.reduce((sum, bill) => sum + Number(bill.total), 0);
    const previousRevenue = previousBills.reduce((sum, bill) => sum + Number(bill.total), 0);

    const percentageChange =
      previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    let trend: 'UP' | 'DOWN' | 'STABLE' = 'STABLE';
    if (percentageChange > 5) trend = 'UP';
    else if (percentageChange < -5) trend = 'DOWN';

    return {
      trend,
      percentageChange,
      currentPeriod: {
        revenue: currentRevenue,
        bills: currentBills.length,
      },
      previousPeriod: {
        revenue: previousRevenue,
        bills: previousBills.length,
      },
    };
  }

  async getRevenueSourceBreakdown(
    tenantId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    products: number;
    services: number;
    total: number;
  }> {
    const bills = await this.billsRepository.find({
      where: {
        tenantId,
        status: 'CONFIRMED',
        paymentStatus: PaymentStatus.PAID,
        createdAt: Between(startDate, endDate),
      },
      relations: ['items'],
    });

    let productsRevenue = 0;
    let servicesRevenue = 0;

    bills.forEach((bill) => {
      bill.items.forEach((item) => {
        if (item.type === 'PRODUCT') {
          productsRevenue += Number(item.total);
        } else if (item.type === 'SERVICE') {
          servicesRevenue += Number(item.total);
        }
      });
    });

    return {
      products: productsRevenue,
      services: servicesRevenue,
      total: productsRevenue + servicesRevenue,
    };
  }
}

