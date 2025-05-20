import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { SharedModule } from './shared/shared.module'

@Module({
    imports: [SharedModule, UserModule, ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
