import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { HashingService } from '../common/security/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) {}

  async singIn(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.userService.findByEmail(createAuthDto.email)
      const hashedPassword = await this.hashingService.check(createAuthDto.password, user.password)

      if (!hashedPassword) {
        throw new UnauthorizedException()
      }

      const payload = {
        user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname },
        tenant: { id: user.tenant.id, name: user.tenant.name, phone: user.tenant.phone }
      }

      return { token: await this.jwtService.signAsync(payload) }
    } catch (error) {
      throw new UnauthorizedException("Credenciais inválidas.")
    }
  }
}
