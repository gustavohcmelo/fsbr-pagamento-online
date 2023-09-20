import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import TestUtils from "../common/test/TestUtils";
import {CreateTenantDto} from "./dto/create-tenant.dto";
import {JwtModule} from "@nestjs/jwt";

const Tenant = TestUtils.newTenant();
const tenantDto: CreateTenantDto = TestUtils.dtoTenant();

describe('TenantController', () => {
  let tenantController: TenantController;
  let tenantService: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([Tenant, Tenant]),
            create: jest.fn().mockResolvedValue(Tenant),
            findOne: jest.fn().mockResolvedValue(Tenant),
            update: jest.fn().mockResolvedValue(Tenant),
            deleteById: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    tenantController = module.get<TenantController>(TenantController);
    tenantService = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(tenantController).toBeDefined();
    expect(tenantService).toBeDefined();
  });

  describe('index', () => {

    it('should return a tenant entity successfully', async () => {

      const result = await tenantController.index();
      expect(tenantService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([Tenant, Tenant]);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantService, 'findAll').mockRejectedValueOnce(new Error());
      expect(tenantController.index).rejects.toThrowError();
    });
  });

  describe('create', () => {

    it('should create a new tenant successfully', async () => {

      const result = await tenantController.create(tenantDto);
      expect(tenantService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantService, 'create').mockRejectedValueOnce(new Error());
      expect(tenantController.create).rejects.toThrowError();
    });
  });

  describe('show', () => {

    it('should return a unique tenant entity successfully', async () => {

      const result = await tenantController.show('1');
      expect(tenantService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant)
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantService, 'findOne').mockRejectedValueOnce(new Error());
      expect(tenantController.show).rejects.toThrowError();
    });
  });

  describe('update', () => {

    it('should update a unique tenant entity', async () => {

      const result = await tenantController.update('1', tenantDto);
      expect(tenantService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(Tenant);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantService, 'update').mockRejectedValueOnce(new Error());
      expect(tenantController.update).rejects.toThrowError();
    });
  });

  describe('delete', () => {

    it('should return undefined on success remove tenant', async () => {

      const result = await tenantController.delete('1');
      expect(tenantService.deleteById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });

    it('should throw an exception', () => {

      jest.spyOn(tenantService, 'deleteById').mockRejectedValueOnce(new Error());
      expect(tenantController.delete).rejects.toThrowError();
    });
  });
});
