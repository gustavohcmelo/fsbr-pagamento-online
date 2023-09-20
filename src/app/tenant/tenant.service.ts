import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>
  ){}

  async findAll() {
    return await this.tenantRepository.find();
  }

  async create(createTenantDto: CreateTenantDto) {
    return await this.tenantRepository.save(this.tenantRepository.create(createTenantDto));
  }

  async findOne(id: string) {
    try {
      return await this.tenantRepository.findOneOrFail({ where: { id }});
    } catch (error) {
      throw new NotFoundException("Tenant não encontrado. Verifique os dados e tente novamente.");
    }
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    try {
      const tenant = await this.findOne(id);

      const updatedTenant = this.tenantRepository.create({ ...tenant, ...updateTenantDto });
      await this.tenantRepository.update(id, updatedTenant);

      return this.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteById(id: string) {
    return await this.tenantRepository.softDelete(id)
  }
}
