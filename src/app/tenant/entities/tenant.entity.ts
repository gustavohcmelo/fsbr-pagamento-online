import { UserEntiy } from "../../user/entities/user.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({ name: 'tenants'})
export class TenantEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email?: string;

    @Column()
    phone?: string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at'})
    deletedAt: Date;

    @OneToMany(() => UserEntiy, (user) => user.tenant, { cascade: true, eager: true })
    users: []

    constructor(tennat?: Partial<TenantEntity>) {
        this.id = tennat?.id;
        this.name = tennat?.name;
        this.phone = tennat?.phone;
   }
}
