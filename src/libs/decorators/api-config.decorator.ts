import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { SuccessResponseInterceptor } from '../interceptors/success-response.interceptor';

export const API_CONFIG_KEY = 'GLOBAL.API_CONFIG_KEY';

export interface ApiConfigOptions {
  useSuccessInterceptor?: boolean;
}

export function ApiConfig(config: ApiConfigOptions) {
  const decorators = [];

  if (config.useSuccessInterceptor) {
    decorators.push(UseInterceptors(SuccessResponseInterceptor));
  }

  return applyDecorators(...decorators);
}
