import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
    async make(password: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async check(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
