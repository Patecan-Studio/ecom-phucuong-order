import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import {
  GetPaymentUrlQueryDTO,
  GetPaymentUrlResponseDTO,
} from './dtos/get-payment-url.dtos';
import { GetPaymentUrlDTO } from '../services/dtos/get-payment-url.dto';
import { ClientIp } from 'src/libs/decorators';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentReturnResultQueryDTO } from './dtos/return-result.dtos';
import { ApiConfig } from 'src/libs/decorators/api-config.decorator';

@Controller({
  path: '/payment',
  version: '1',
})
@ApiConfig({
  useSuccessInterceptor: false,
})
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  // @Redirect()
  @ApiResponse({
    status: 200,
    type: GetPaymentUrlResponseDTO,
  })
  @ApiOperation({
    operationId: 'payment',
    summary: 'Process payment',
    description: 'Redirects user to VNPAY payment page',
  })
  getPaymentUrl(@Query() q: GetPaymentUrlQueryDTO, @ClientIp() ipAddr: string) {
    const dto: GetPaymentUrlDTO = {
      ...q,
      ipAddress: ipAddr,
    };
    const paymentUrl = this.paymentService.getPaymentUrl(dto);

    return paymentUrl;
  }

  @Get('/returnResult')
  @Redirect()
  redirectPaymentResult(@Query() query: PaymentReturnResultQueryDTO) {
    console.log(query);
    const url = this.paymentService.verifyAndGetRedirectUrl(query);
    return { url: url.toString() };
  }

  @Get('/vnpayIPN')
  @ApiQuery({
    type: PaymentReturnResultQueryDTO,
  })
  async vnPayIPN(@Query() dto: PaymentReturnResultQueryDTO) {
    const result = await this.paymentService.updateOrderPayment(dto);
    return result;
  }
}
