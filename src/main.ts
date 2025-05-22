import { NestFactory, Reflector } from '@nestjs/core'
import { UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common'
import envConfig from './shared/config'
import { AppModule } from './app.module'
import { TransformInterceptor } from './core/transform.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Config Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints ? Object.values(error.constraints)[0] : 'Lỗi validation',
                }))
                return new UnprocessableEntityException(result)
            },
        }),
    )

    const reflector = app.get(Reflector)

    // Config Interceptor
    app.useGlobalInterceptors(new TransformInterceptor(reflector))

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

    await app.listen(envConfig.PORT)
}
bootstrap()
