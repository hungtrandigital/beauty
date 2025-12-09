import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionsService } from './promotions.service';
import { PromotionEntity } from './entities/promotion.entity';
import { VoucherEntity } from './entities/voucher.entity';
import { PromotionUsageEntity } from './entities/promotion-usage.entity';

describe('PromotionsService', () => {
  let service: PromotionsService;
  let promotionsRepository: Repository<PromotionEntity>;

  const mockPromotionsRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockVouchersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockPromotionUsageRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionsService,
        {
          provide: getRepositoryToken(PromotionEntity),
          useValue: mockPromotionsRepository,
        },
        {
          provide: getRepositoryToken(VoucherEntity),
          useValue: mockVouchersRepository,
        },
        {
          provide: getRepositoryToken(PromotionUsageEntity),
          useValue: mockPromotionUsageRepository,
        },
      ],
    }).compile();

    service = module.get<PromotionsService>(PromotionsService);
    promotionsRepository = module.get<Repository<PromotionEntity>>(
      getRepositoryToken(PromotionEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a promotion', async () => {
      const createDto = {
        type: 'INVOICE_DISCOUNT',
        name: 'Summer Sale',
        rules: { discountPercentage: 20 },
        startDate: '2025-01-01',
        endDate: '2025-12-31',
      };

      mockPromotionsRepository.create.mockReturnValue({ id: 'promo-1', ...createDto });
      mockPromotionsRepository.save.mockResolvedValue({ id: 'promo-1', ...createDto });

      const result = await service.create(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(mockPromotionsRepository.create).toHaveBeenCalled();
      expect(mockPromotionsRepository.save).toHaveBeenCalled();
    });
  });
});

