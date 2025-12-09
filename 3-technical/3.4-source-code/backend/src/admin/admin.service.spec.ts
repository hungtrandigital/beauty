import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminService } from './admin.service';
import { RoleEntity } from './entities/role.entity';
import { SystemSettingsEntity } from './entities/system-settings.entity';
import { ActivityLogEntity } from './entities/activity-log.entity';
import { UsersService } from '../users/users.service';
import { BranchesService } from '../branches/branches.service';
import { TenantsService } from '../tenants/tenants.service';

describe('AdminService', () => {
  let service: AdminService;
  let rolesRepository: Repository<RoleEntity>;

  const mockUsersService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockBranchesService = {
    findAll: jest.fn(),
  };

  const mockTenantsService = {
    findAll: jest.fn(),
  };

  const mockRolesRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockSettingsRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockActivityLogRepository = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRolesRepository,
        },
        {
          provide: getRepositoryToken(SystemSettingsEntity),
          useValue: mockSettingsRepository,
        },
        {
          provide: getRepositoryToken(ActivityLogEntity),
          useValue: mockActivityLogRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: BranchesService,
          useValue: mockBranchesService,
        },
        {
          provide: TenantsService,
          useValue: mockTenantsService,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    rolesRepository = module.get<Repository<RoleEntity>>(getRepositoryToken(RoleEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRole', () => {
    it('should create a role', async () => {
      const createDto = {
        name: 'Branch Manager',
        permissions: ['bills.create', 'bills.update'],
      };

      mockRolesRepository.findOne.mockResolvedValue(null);
      mockRolesRepository.create.mockReturnValue({ id: 'role-1', ...createDto });
      mockRolesRepository.save.mockResolvedValue({ id: 'role-1', ...createDto });

      const result = await service.createRole(createDto, 'tenant-1');

      expect(result).toBeDefined();
      expect(mockRolesRepository.create).toHaveBeenCalled();
      expect(mockRolesRepository.save).toHaveBeenCalled();
    });
  });
});

