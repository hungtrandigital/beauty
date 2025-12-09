import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InventoryEntity, LocationType } from './entities/inventory.entity';
import { ImportRequestEntity, ImportRequestStatus } from './entities/import-request.entity';
import { ExportRequestEntity, ExportRequestStatus } from './entities/export-request.entity';
import { CreateImportRequestDto } from './dto/create-import-request.dto';
import { CreateExportRequestDto } from './dto/create-export-request.dto';
import { ProductsService } from '../products/products.service';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(ImportRequestEntity)
    private importRequestRepository: Repository<ImportRequestEntity>,
    @InjectRepository(ExportRequestEntity)
    private exportRequestRepository: Repository<ExportRequestEntity>,
    private productsService: ProductsService,
    private branchesService: BranchesService,
    private dataSource: DataSource,
  ) {}

  // Import Request Methods
  async createImportRequest(
    createDto: CreateImportRequestDto,
    tenantId: string,
    requesterId: string,
  ): Promise<ImportRequestEntity> {
    // Validate products exist
    for (const item of createDto.products) {
      await this.productsService.findOne(item.productId, tenantId);
    }

    const importRequest = this.importRequestRepository.create({
      tenantId,
      requesterId,
      products: createDto.products,
      notes: createDto.notes,
      status: ImportRequestStatus.PENDING,
    });

    return this.importRequestRepository.save(importRequest);
  }

  async approveImportRequest(
    id: string,
    tenantId: string,
    approverId: string,
  ): Promise<ImportRequestEntity> {
    const request = await this.importRequestRepository.findOne({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Import request with ID ${id} not found`);
    }

    if (request.status !== ImportRequestStatus.PENDING) {
      throw new BadRequestException(`Import request is not pending`);
    }

    // Use transaction to ensure atomicity
    return await this.dataSource.transaction(async (manager) => {
      // Update request status
      request.status = ImportRequestStatus.APPROVED;
      request.approvedAt = new Date();
      request.approverId = approverId;
      await manager.save(request);

      // Update inventory for each product
      for (const item of request.products) {
        await this.updateInventory(
          tenantId,
          item.productId,
          LocationType.CENTRAL_WAREHOUSE,
          null,
          item.quantity,
          manager,
        );
      }

      return request;
    });
  }

  async rejectImportRequest(
    id: string,
    tenantId: string,
    approverId: string,
    reason: string,
  ): Promise<ImportRequestEntity> {
    const request = await this.importRequestRepository.findOne({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Import request with ID ${id} not found`);
    }

    if (request.status !== ImportRequestStatus.PENDING) {
      throw new BadRequestException(`Import request is not pending`);
    }

    request.status = ImportRequestStatus.REJECTED;
    request.approverId = approverId;
    request.rejectionReason = reason;

    return this.importRequestRepository.save(request);
  }

  // Export Request Methods
  async createExportRequest(
    createDto: CreateExportRequestDto,
    tenantId: string,
    requesterId: string,
  ): Promise<ExportRequestEntity> {
    // Validate branch exists
    await this.branchesService.findOne(createDto.branchId, tenantId);

    // Validate products exist and check available quantity
    for (const item of createDto.products) {
      await this.productsService.findOne(item.productId, tenantId);

      const inventory = await this.getInventory(
        tenantId,
        item.productId,
        LocationType.CENTRAL_WAREHOUSE,
        null,
      );

      if (!inventory || inventory.quantity - inventory.reservedQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient quantity for product ${item.productId}`,
        );
      }
    }

    const exportRequest = this.exportRequestRepository.create({
      tenantId,
      requesterId,
      branchId: createDto.branchId,
      products: createDto.products,
      notes: createDto.notes,
      status: ExportRequestStatus.PENDING,
    });

    return this.exportRequestRepository.save(exportRequest);
  }

  async approveExportRequest(
    id: string,
    tenantId: string,
    approverId: string,
  ): Promise<ExportRequestEntity> {
    const request = await this.exportRequestRepository.findOne({
      where: { id, tenantId },
      relations: ['branch'],
    });

    if (!request) {
      throw new NotFoundException(`Export request with ID ${id} not found`);
    }

    if (request.status !== ExportRequestStatus.PENDING) {
      throw new BadRequestException(`Export request is not pending`);
    }

    // Use transaction to ensure atomicity
    return await this.dataSource.transaction(async (manager) => {
      // Update request status
      request.status = ExportRequestStatus.APPROVED;
      request.approvedAt = new Date();
      request.approverId = approverId;
      await manager.save(request);

      // Decrease central warehouse inventory (reserve for confirmation)
      for (const item of request.products) {
        await this.updateInventory(
          tenantId,
          item.productId,
          LocationType.CENTRAL_WAREHOUSE,
          null,
          -item.quantity,
          manager,
        );
      }

      return request;
    });
  }

  async confirmExportReceipt(
    id: string,
    tenantId: string,
    confirmerId: string,
  ): Promise<ExportRequestEntity> {
    const request = await this.exportRequestRepository.findOne({
      where: { id, tenantId },
      relations: ['branch'],
    });

    if (!request) {
      throw new NotFoundException(`Export request with ID ${id} not found`);
    }

    if (request.status !== ExportRequestStatus.APPROVED) {
      throw new BadRequestException(`Export request must be approved first`);
    }

    // Use transaction to ensure atomicity
    return await this.dataSource.transaction(async (manager) => {
      // Update request status
      request.status = ExportRequestStatus.CONFIRMED;
      request.confirmedAt = new Date();
      request.confirmerId = confirmerId;
      await manager.save(request);

      // Increase branch inventory
      for (const item of request.products) {
        await this.updateInventory(
          tenantId,
          item.productId,
          LocationType.BRANCH,
          request.branchId,
          item.quantity,
          manager,
        );
      }

      return request;
    });
  }

  async rejectExportRequest(
    id: string,
    tenantId: string,
    approverId: string,
    reason: string,
  ): Promise<ExportRequestEntity> {
    const request = await this.exportRequestRepository.findOne({
      where: { id, tenantId },
    });

    if (!request) {
      throw new NotFoundException(`Export request with ID ${id} not found`);
    }

    if (request.status !== ExportRequestStatus.PENDING) {
      throw new BadRequestException(`Export request is not pending`);
    }

    request.status = ExportRequestStatus.REJECTED;
    request.approverId = approverId;
    request.rejectionReason = reason;

    return this.exportRequestRepository.save(request);
  }

  // Inventory Viewing Methods
  async getCentralWarehouseInventory(
    tenantId: string,
    productId?: string,
  ): Promise<InventoryEntity[]> {
    const where: any = {
      tenantId,
      locationType: LocationType.CENTRAL_WAREHOUSE,
    };

    if (productId) {
      where.productId = productId;
    }

    return this.inventoryRepository.find({
      where,
      relations: ['product'],
    });
  }

  async getBranchInventory(
    tenantId: string,
    branchId: string,
    productId?: string,
  ): Promise<InventoryEntity[]> {
    const where: any = {
      tenantId,
      locationType: LocationType.BRANCH,
      locationId: branchId,
    };

    if (productId) {
      where.productId = productId;
    }

    return this.inventoryRepository.find({
      where,
      relations: ['product'],
    });
  }

  async getAllLocationsInventory(
    tenantId: string,
    productId?: string,
  ): Promise<{
    centralWarehouse: InventoryEntity[];
    branches: Array<{ branchId: string; inventory: InventoryEntity[] }>;
  }> {
    const centralWarehouse = await this.getCentralWarehouseInventory(tenantId, productId);

    // Get all branches for tenant
    const branches = await this.branchesService.findAll(tenantId);

    // Get inventory for each branch
    const branchInventories = await Promise.all(
      branches.map(async (branch) => ({
        branchId: branch.id,
        inventory: await this.getBranchInventory(tenantId, branch.id, productId),
      })),
    );

    return {
      centralWarehouse,
      branches: branchInventories,
    };
  }

  // Private helper methods
  private async getInventory(
    tenantId: string,
    productId: string,
    locationType: LocationType,
    locationId: string | null,
  ): Promise<InventoryEntity | null> {
    const where: any = {
      tenantId,
      productId,
      locationType,
    };
    
    if (locationId !== null) {
      where.locationId = locationId;
    } else {
      where.locationId = null;
    }
    
    return this.inventoryRepository.findOne({
      where,
    });
  }

  private async updateInventory(
    tenantId: string,
    productId: string,
    locationType: LocationType,
    locationId: string | null,
    quantityChange: number,
    manager?: any,
  ): Promise<InventoryEntity> {
    const repository = manager || this.inventoryRepository;

    let inventory = await this.getInventory(tenantId, productId, locationType, locationId);

    if (!inventory) {
      inventory = repository.create({
        tenantId,
        productId,
        locationType,
        locationId,
        quantity: 0,
        reservedQuantity: 0,
        lowStockThreshold: 0,
      });
    }

    // TypeScript guard: inventory is guaranteed to be non-null here
    const inventoryEntity = inventory as InventoryEntity;
    inventoryEntity.quantity += quantityChange;

    // Ensure quantity doesn't go negative
    if (inventoryEntity.quantity < 0) {
      throw new BadRequestException('Insufficient inventory quantity');
    }

    inventoryEntity.lastUpdated = new Date();

    return repository.save(inventoryEntity);
  }
}

