import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './entities/customer.entity';
import { PointsTransactionEntity } from './entities/points-transaction.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let customersRepository: Repository<CustomerEntity>;

  const mockDataSource = {
    transaction: jest.fn((callback) => callback({ findOne: jest.fn(), save: jest.fn(), create: jest.fn() })),
  };

  const mockCustomersRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  const mockPointsTransactionRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: mockCustomersRepository,
        },
        {
          provide: getRepositoryToken(PointsTransactionEntity),
          useValue: mockPointsTransactionRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    customersRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createDto = {
        name: 'Test Customer',
        phone: '0901234567',
      };

      mockCustomersRepository.findOne.mockResolvedValue(null);
      mockCustomersRepository.create.mockReturnValue({
        id: 'customer-1',
        ...createDto,
        qrCode: 'qr-code-123',
      });
      mockCustomersRepository.save.mockResolvedValue({
        id: 'customer-1',
        ...createDto,
        qrCode: 'qr-code-123',
      });

      const result = await service.create(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(result.qrCode).toBeDefined();
      expect(mockCustomersRepository.create).toHaveBeenCalled();
      expect(mockCustomersRepository.save).toHaveBeenCalled();
    });
  });
});

