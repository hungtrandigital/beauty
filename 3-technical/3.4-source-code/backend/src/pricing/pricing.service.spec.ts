import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingService } from './pricing.service';
import { BranchPricingEntity } from './entities/branch-pricing.entity';
import { BranchesService } from '../branches/branches.service';

describe('PricingService', () => {
  let service: PricingService;
  let repository: Repository<BranchPricingEntity>;

  const mockBranchesService = {
    findOne: jest.fn(),
  };

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
        PricingService,
        {
          provide: getRepositoryToken(BranchPricingEntity),
          useValue: mockRepository,
        },
        {
          provide: BranchesService,
          useValue: mockBranchesService,
        },
      ],
    }).compile();

    service = module.get<PricingService>(PricingService);
    repository = module.get<Repository<BranchPricingEntity>>(
      getRepositoryToken(BranchPricingEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create branch pricing', async () => {
      const createDto = {
        branchId: 'branch-1',
        itemType: 'PRODUCT',
        itemId: 'product-1',
        customerPrice: 150000,
      };

      mockBranchesService.findOne.mockResolvedValue({ id: 'branch-1' });
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ id: 'pricing-1', ...createDto });
      mockRepository.save.mockResolvedValue({ id: 'pricing-1', ...createDto });

      const result = await service.create(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});

