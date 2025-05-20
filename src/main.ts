import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Config Validation
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints ? Object.values(error.constraints)[0] : 'Lỗi validation',
                }))
                return new BadRequestException(result)
            },
            whitelist: true,
        }),
    )

    // Config CORS
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    })

    // Config Versioning
    app.setGlobalPrefix('api')
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['1'],
    })

    // Config PORT
    const configService = app.get(ConfigService)
    const port = configService.get<string>('PORT') ?? 8000

    await app.listen(port)
}
bootstrap()
