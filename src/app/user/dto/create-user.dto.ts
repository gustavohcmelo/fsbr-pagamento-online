export class CreateUserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    tenant_id?: string;
}
