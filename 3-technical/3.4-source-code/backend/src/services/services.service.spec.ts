import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicesService } from './services.service';
import { ServiceEntity, ServiceType } from './entities/service.entity';

describe('ServicesService', () => {
  let service: ServicesService;
  let repository: Repository<ServiceEntity>;

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(ServiceEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    repository = module.get<Repository<ServiceEntity>>(getRepositoryToken(ServiceEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new service', async () => {
      const createDto = {
        name: 'Haircut',
        type: ServiceType.BOTH,
        price: 200000,
      };

      mockRepository.create.mockReturnValue({ id: 'service-1', ...createDto });
      mockRepository.save.mockResolvedValue({ id: 'service-1', ...createDto });

      const result = await service.create(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw error if commission split does not total 100%', async () => {
      const createDto = {
        name: 'Haircut',
        type: ServiceType.BOTH,
        price: 200000,
        commissionSplit: {
          type: 'RATIO' as const,
          splits: [
            { role: 'stylist', percentage: 50 },
            { role: 'assistant', percentage: 40 }, // Total: 90%
          ],
        },
      };

      await expect(service.create(createDto, 'tenant-1')).rejects.toThrow();
    });
  });
});

