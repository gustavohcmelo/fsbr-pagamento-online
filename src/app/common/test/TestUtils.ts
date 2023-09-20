import { TenantEntity } from "../../tenant/entities/tenant.entity";
import { UserEntiy } from "../../user/entities/user.entity";

class TestUtils {

    newUser(): UserEntiy {
        return new UserEntiy({
            id: '1',
            firstname: 'teste1',
            lastname: 'teste',
            email: 'email1@teste.com.br',
            password: '123456',
            tenant: this.newTenant()
        })
    }

    dtoUser() {
        return {
            id: '1',
            firstname: 'teste1',
            lastname: 'teste',
            email: 'email1@teste.com.br',
            password: '123456',
            tenant_id: '1'
        };
    }

    dtoUserWithoutTenant() {
        return {
            id: '1',
            firstname: 'teste1',
            lastname: 'teste',
            email: 'email1@teste.com.br',
            password: '123456'
        };
    }

    newTenant(): TenantEntity {
        return new TenantEntity({
            name: 'Fsbr',
            email: 'fsbr@fsbr.com.br',
            phone: '8195487984'
        })
    }

    dtoTenant() {
        return {
            name: 'Fsbr',
            email: 'fsbr@fsbr.com.br',
            phone: '8195487984'
        }
    }

    generateAccessToken() {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZjNlYjBkOWMtMDdkMC00NmUxLTk0ZDEtZGQyY2FlNDY2NDY0IiwiZW1haWwiOiJzdXBvcnRlQGZzYnIuY29tLmJyIiwiZmlyc3RuYW1lIjoiRnNiciIsImxhc3RuYW1lIjoiU29mdHdhcmUifSwidGVuYW50Ijp7ImlkIjoiYTI3Y2JiMmUtNjc0Mi00OGUyLWIzY2MtZDA1NGFmMjM5YjY5IiwibmFtZSI6IkZzYnIgLSBGw6FicmljYSBkZSBTb2Z0d2FyZSBkbyBCcmFzaWwiLCJwaG9uZSI6IjgxNjQ4NTc5NTUifSwiaWF0IjoxNjk1MDg3NjQ3LCJleHAiOjE2OTUwOTEyNDd9._sc5e98VfEF7kyxLKnPlO3rYwsCIHezuZlo1NjwTUC8'
    }

    dtoAuth() {
        return {
            email: 'suporte@fsbr.com.br',
            password: '123456'
        }
    }

}

export default new TestUtils()