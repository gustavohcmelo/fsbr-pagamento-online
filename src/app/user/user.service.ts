import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntiy } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntiy)
    private readonly userRepository: Repository<UserEntiy>,
    private readonly tenantService: TenantService
  ){}

  async findAll() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    try {

      if (createUserDto?.tenant_id) {
        const tenant = await this.tenantService.findOne(createUserDto.tenant_id);
        const user = this.userRepository.create(createUserDto);
        user.tenant = tenant;
        await this.userRepository.save(user);

      } else {
        await this.userRepository.save(this.userRepository.create(createUserDto));
      }

      return await this.userRepository.findOneOrFail({ where: { email: createUserDto.email }})

    } catch (error) {
      throw new UnprocessableEntityException(error.message)
    }
  }

  async findOne(id: string) {
    try{
      return await this.userRepository.findOneOrFail({ where: { id }})

    } catch(error) {
      throw new NotFoundException("Usuário não encontrado. Verifique os dados e tente novamente.")
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id }})
      user.tenant = await this.tenantService.findOne(updateUserDto.tenant_id)

      const updatedUser = this.userRepository.create({ ...user, ...updateUserDto })
      await this.userRepository.update(id, updatedUser)

      return await this.findOne(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async deleteById(id: string) {
    try {
      await this.userRepository.findOneOrFail({ where: { id }})
      await this.userRepository.softDelete(id)
    } catch (error) {
      throw new NotFoundException("Usuário não encontrado. Verifique os dados e tente novamente.")
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { email }, relations: { tenant: true }})
    } catch (error) {
      throw new NotFoundException("Usuário não encontrado. Verifique os dados e tente novamente")
    }
  }
}
