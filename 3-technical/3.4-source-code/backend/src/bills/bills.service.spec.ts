import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BillsService } from './bills.service';
import { BillEntity } from './entities/bill.entity';
import { BillItemEntity } from './entities/bill-item.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ProductsService } from '../products/products.service';
import { BranchesService } from '../branches/branches.service';
import { InventoryService } from '../inventory/inventory.service';

describe('BillsService', () => {
  let service: BillsService;
  let billsRepository: Repository<BillEntity>;

  const mockProductsService = {
    findOne: jest.fn(),
  };

  const mockBranchesService = {
    findOne: jest.fn(),
  };

  const mockInventoryService = {
    getBranchInventory: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn((callback) => callback({ save: jest.fn(), create: jest.fn() })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillsService,
        {
          provide: getRepositoryToken(BillEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BillItemEntity),
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PaymentEntity),
          useValue: {
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
          provide: InventoryService,
          useValue: mockInventoryService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<BillsService>(BillsService);
    billsRepository = module.get<Repository<BillEntity>>(getRepositoryToken(BillEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a bill successfully', async () => {
      const createDto = {
        items: [
          {
            type: 'PRODUCT',
            itemId: 'product-1',
            quantity: 2,
          },
        ],
      };

      mockBranchesService.findOne.mockResolvedValue({ id: 'branch-1' });
      mockProductsService.findOne.mockResolvedValue({
        id: 'product-1',
        name: 'Test Product',
        customerPrice: 100000,
      });
      mockInventoryService.getBranchInventory.mockResolvedValue([
        {
          productId: 'product-1',
          quantity: 10,
          reservedQuantity: 0,
        },
      ]);
      billsRepository.count = jest.fn().mockResolvedValue(0);
      billsRepository.create = jest.fn().mockReturnValue({
        id: 'bill-1',
        ...createDto,
      });
      billsRepository.save = jest.fn().mockResolvedValue({
        id: 'bill-1',
        ...createDto,
      });

      const result = await service.create(createDto, 'tenant-1', 'branch-1');

      expect(result).toBeDefined();
      expect(billsRepository.create).toHaveBeenCalled();
      expect(billsRepository.save).toHaveBeenCalled();
    });
  });
});

