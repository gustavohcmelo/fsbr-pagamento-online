import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from './tenant.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TenantEntity} from "./entities/tenant.entity";
import {Repository} from "typeorm";
import TestUtils from "../common/test/TestUtils";
import {CreateTenantDto} from "./dto/create-tenant.dto";

const Tenant = TestUtils.newTenant();
const tenantDto: CreateTenantDto = TestUtils.dtoTenant();

describe('TenantService', () => {
  let tenantService: TenantService;
  let tenantRepository: Repository<TenantEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          TenantService,
        {
          provide: getRepositoryToken(TenantEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([Tenant, Tenant]),
            save: jest.fn().mockResolvedValue(Tenant),
            create: jest.fn().mockResolvedValue(Tenant),
            findOneOrFail: jest.fn().mockResolvedValue(Tenant),
            update: jest.fn().mockResolvedValue(Tenant),
            softDelete: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    tenantService = module.get<TenantService>(TenantService);
    tenantRepository = module.get<Repository<TenantEntity>>(getRepositoryToken(TenantEntity));
  });

  it('should be defined', () => {
    expect(tenantService).toBeDefined();
    expect(tenantRepository).toBeDefined();
  });

  describe('findAll', () => {

    it('should return a tenant entity list', async () => {

      const result = await tenantService.findAll();
      expect(tenantRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([Tenant, Tenant]);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantRepository, 'find').mockRejectedValueOnce(new Error());
      expect(tenantService.findAll).rejects.toThrowError();
    });
  });

  describe('create', () => {

    it('should return save a new tenant', async () => {

      const result = await tenantService.create(tenantDto);
      expect(tenantRepository.create).toHaveBeenCalledTimes(1);
      expect(tenantRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantRepository, 'save').mockRejectedValueOnce(new Error());
      expect(tenantService.create).rejects.toThrowError();
    });
  });

  describe('findOne', () => {

    it('should return a unique tenant entity', async () => {

      const result = await tenantService.findOne('1');
      expect(tenantRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());
      expect(tenantService.findOne).rejects.toThrowError();
    });
  });

  describe('udpate', () => {

    it('should update a unique tenant entity', async () => {

      const result = await tenantService.update('1', tenantDto);
      expect(tenantRepository.create).toHaveBeenCalledTimes(1);
      expect(tenantRepository.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant);
    });

    it('should throw an exception if dont found a tenant', () => {

      jest.spyOn(tenantService, 'findOne').mockRejectedValueOnce(new Error());
      expect(tenantService.update).rejects.toThrowError();
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantRepository, 'update').mockRejectedValueOnce(new Error());
      expect(tenantService.update).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {

    it('should return undefined when remove a tenant on success', async () => {

      const result = await tenantService.deleteById('1');
      expect(tenantRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantRepository,'softDelete').mockRejectedValueOnce(new Error());
      expect(tenantService.deleteById).rejects.toThrowError();
    });
  });
});
