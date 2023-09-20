import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntiy } from './entities/user.entity';
import { TenantService } from '../tenant/tenant.service';
import TestUtils from '../common/test/TestUtils';
import { Repository } from 'typeorm';

const User = TestUtils.newUser();
const Tenant = TestUtils.newTenant();
const userDto = TestUtils.dtoUser();
const userDtoWihoutTenant = TestUtils.dtoUserWithoutTenant();

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntiy>;
  let tenantService: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntiy),
          useValue: {
            find: jest.fn().mockResolvedValue([User, User]),
            create: jest.fn().mockResolvedValue(User),
            save: jest.fn().mockResolvedValue(User),
            findOneOrFail: jest.fn().mockResolvedValue(User),
            update: jest.fn().mockResolvedValue(User),
            findOne: jest.fn().mockResolvedValue(User),
            softDelete: jest.fn().mockResolvedValue(undefined)
          }
        },
        {
          provide: TenantService,
          useValue:{
            findOne: jest.fn().mockResolvedValue(Tenant)
          }
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    tenantService = module.get<TenantService>(TenantService);
    userRepository = module.get<Repository<UserEntiy>>(getRepositoryToken(UserEntiy));
  });

  it('should be defined', () => {

    expect(userService).toBeDefined();
  });

  describe('findAll', () => {

    it('should return a user entity list', async () => {

      const result = await userService.findAll();
      expect(result).toEqual([User, User]);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {

      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());
      expect(userService.findAll).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a user entity successfully with Tenant', async () => {

      const result = await userService.create(userDto);
      expect(result).toEqual(User);
      expect(tenantService.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should save a user entity successfully without Tenant', async () => {

      const result = await userService.create(userDtoWihoutTenant);
      expect(result).toEqual(User);
      expect(tenantService.findOne).toHaveBeenCalledTimes(0);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userService.create).rejects.toThrowError();
    });
  });

  describe('findOne', () => {

    it('findOne', async () => {

      const result = await userService.findOne('1');
      expect(result).toEqual(User);
    });

    it('should throw an exception', async () => {

      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());
      expect(userService.findOne).rejects.toThrowError();
    });
  });

  describe('update', () => {

    it('should update a user entity successfully', async () => {

      const result = await userService.update('1', userDto);
      expect(result).toEqual(User);
      expect(tenantService.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {

      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
      expect(userService.update).rejects.toThrowError();
    });
  })

  describe('deleteById', () => {

    it('should return undefined on success', async () => {

      const result = await userService.deleteById('1');
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });

    it('should throw an exception', () => {

      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());
      expect(userService.deleteById).rejects.toThrowError();
    });
  });

  describe('findByEmail', () => {

    it('should return a user entity', async () => {

      const result = await userService.findByEmail('teste@teste.com.br');
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(User);
    });

    it('should throw an exception', () => {

      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());
      expect(userService.deleteById).rejects.toThrowError();
    });
  });
});
