import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntiy } from './entities/user.entity';
import { HashingModule } from '../common/security/hashing/hashing.module';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { TenantService } from '../tenant/tenant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntiy, TenantEntity]), 
    HashingModule
  ],
  controllers: [UserController],
  providers: [UserService, TenantService],
  exports:[UserService]
})
export class UserModule {}
