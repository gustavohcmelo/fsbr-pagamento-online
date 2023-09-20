import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { TenantModule } from './app/tenant/tenant.module';
import { HashingModule } from './app/common/security/hashing/hashing.module';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST', 'localhost'),
      port: configService.get('DB_PORT', 3306),
      username: configService.get('DB_USER', 'fsbr_dev'),
      password: configService.get('DB_PASSWORD', '2fsbr_dev1'),
      database: configService.get('DB_SCHEMA', 'ms-fsbr-pagamentoonline'),
      entities: [__dirname + '/**/*.entity{.js, .ts}'], 
      synchronize: true
    })
  }),
  UserModule,
  AuthModule,
  HashingModule,
  TenantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
