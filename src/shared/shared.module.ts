import { Global, Module } from '@nestjs/common'
import { HashService } from './services/hash.service'
import { PrismaService } from './services/prisma.service'

const sharedServices = [PrismaService, HashService]

@Global()
@Module({
    providers: sharedServices,
    exports: sharedServices,
})
export class SharedModule {}
