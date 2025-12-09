import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './entities/inventory.entity';
import { ImportRequestEntity } from './entities/import-request.entity';
import { ExportRequestEntity } from './entities/export-request.entity';
import { ProductsService } from '../products/products.service';
import { BranchesService } from '../branches/branches.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let inventoryRepository: Repository<InventoryEntity>;
  let importRequestRepository: Repository<ImportRequestEntity>;
  let exportRequestRepository: Repository<ExportRequestEntity>;

  const mockProductsService = {
    findOne: jest.fn(),
  };

  const mockBranchesService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn((callback) => callback({ save: jest.fn() })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(InventoryEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ImportRequestEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ExportRequestEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: BranchesService,
          useValue: mockBranchesService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    inventoryRepository = module.get<Repository<InventoryEntity>>(
      getRepositoryToken(InventoryEntity),
    );
    importRequestRepository = module.get<Repository<ImportRequestEntity>>(
      getRepositoryToken(ImportRequestEntity),
    );
    exportRequestRepository = module.get<Repository<ExportRequestEntity>>(
      getRepositoryToken(ExportRequestEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createImportRequest', () => {
    it('should create import request successfully', async () => {
      const createDto = {
        products: [{ productId: 'product-1', quantity: 100 }],
        notes: 'Test import',
      };

      mockProductsService.findOne.mockResolvedValue({ id: 'product-1' });
      importRequestRepository.create = jest.fn().mockReturnValue({
        id: 'request-1',
        ...createDto,
      });
      importRequestRepository.save = jest.fn().mockResolvedValue({
        id: 'request-1',
        ...createDto,
      });

      const result = await service.createImportRequest(
        createDto,
        'tenant-1',
        'user-1',
      );

      expect(result).toBeDefined();
      expect(importRequestRepository.create).toHaveBeenCalled();
      expect(importRequestRepository.save).toHaveBeenCalled();
    });
  });

  describe('getCentralWarehouseInventory', () => {
    it('should return central warehouse inventory', async () => {
      const mockInventory = [
        {
          id: 'inv-1',
          productId: 'product-1',
          quantity: 100,
          locationType: 'CENTRAL_WAREHOUSE',
        },
      ];

      inventoryRepository.find = jest.fn().mockResolvedValue(mockInventory);

      const result = await service.getCentralWarehouseInventory('tenant-1');

      expect(result).toEqual(mockInventory);
      expect(inventoryRepository.find).toHaveBeenCalled();
    });
  });
});

