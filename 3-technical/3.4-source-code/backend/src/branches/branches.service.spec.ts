import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchesService } from './branches.service';
import { BranchEntity } from './entities/branch.entity';

describe('BranchesService', () => {
  let service: BranchesService;
  let repository: Repository<BranchEntity>;

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
        BranchesService,
        {
          provide: getRepositoryToken(BranchEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BranchesService>(BranchesService);
    repository = module.get<Repository<BranchEntity>>(getRepositoryToken(BranchEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new branch', async () => {
      const createDto = {
        code: 'BR001',
        name: 'Branch 1',
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ id: 'branch-1', ...createDto });
      mockRepository.save.mockResolvedValue({ id: 'branch-1', ...createDto });

      const result = await service.create(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw error if code already exists', async () => {
      const createDto = {
        code: 'BR001',
        name: 'Branch 1',
      };

      mockRepository.findOne.mockResolvedValue({ id: 'existing-branch' });

      await expect(service.create(createDto, 'tenant-1')).rejects.toThrow();
    });
  });
});

