import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { TenantEntity } from "../../tenant/entities/tenant.entity";
@Entity({ name: 'users' })
@Unique(["email"])
export class UserEntiy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @ManyToOne(() => TenantEntity, (tenant) => tenant.users)
    tenant: TenantEntity

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    constructor(user?: Partial<UserEntiy>) {
        this.id = user?.id;
        this.firstname = user?.firstname;
        this.lastname = user?.lastname;
        this.email = user?.email;
        this.password = user?.password;
        this.tenant = user?.tenant;
    }
}


