import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { HashingService } from '../common/security/hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // PEGAR A PARTIR DO .ENV
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, HashingService]
})
export class AuthModule {}
