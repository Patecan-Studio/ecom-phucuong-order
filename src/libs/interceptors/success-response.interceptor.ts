import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs'
import { ResultCode } from '../enums/result-code.enum'
import { Reflector } from '@nestjs/core'
import { API_CONFIG_KEY } from '../decorators/api-config.decorator'

export class SuccessResponseInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler) {
		const apiConfig =
			this.reflector.getAllAndOverride(API_CONFIG_KEY, [
				context.getHandler(),
				context.getClass(),
			]) || {}
		return next.handle().pipe(
			map((data) => {
				if (apiConfig.ignoreSuccessInterceptor) {
					return data
				}
				return {
					resultCode: data.resultCode || ResultCode.Success, // fallback for result code
					...data,
				}
			}),
		)
	}
}
