import { compare, hash } from 'bcrypt'
import { Injectable } from '@nestjs/common'

const SALT_ROUNDS = 10

@Injectable()
export class HashService {
    hashPassword(password: string) {
        return hash(password, SALT_ROUNDS)
    }

    comparePassword(password: string, hash: string) {
        return compare(password, hash)
    }
}
