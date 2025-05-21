import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { RESPONSE_MESSAGE } from 'src/decorator/customize.decorator'

export interface Response<T> {
    statusCode: number
    message: string
    data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || '',
                    data,
                }
            }),
        )
    }
}
