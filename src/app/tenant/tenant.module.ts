import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { UserEntiy } from '../user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([TenantEntity, UserEntiy])
  ],
  controllers: [TenantController],
  providers: [TenantService]
})
export class TenantModule {}
