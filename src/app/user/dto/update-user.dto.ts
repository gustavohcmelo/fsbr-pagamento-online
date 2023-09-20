import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    tenant_id?: string;
}
