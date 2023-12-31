import { Controller, Get, Query, Redirect, Res } from '@nestjs/common'
import { PaymentService } from '../services/payment.service'
import {
	GetPaymentUrlQueryDTO,
	GetPaymentUrlResponseDTO,
} from './dtos/get-payment-url.dtos'
import { GetPaymentUrlDTO } from '../services/dtos/get-payment-url.dto'
import { ClientIp } from 'src/libs/decorators'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { PaymentReturnResultQueryDTO } from './dtos/return-result.dtos'

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Get()
	@ApiResponse({
		status: 200,
		type: GetPaymentUrlResponseDTO,
	})
	@Redirect()
	getPaymentUrl(
		@Query() q: GetPaymentUrlQueryDTO,
		@ClientIp() ipAddr: string,
	) {
		const dto: GetPaymentUrlDTO = {
			...q,
			ipAddress: ipAddr,
		}
		const paymentUrl = this.paymentService.getPaymentUrl(dto)

		return { url: paymentUrl }
	}

	@Get('/returnResult')
	@Redirect()
	redirectPaymentResult(@Query() query: PaymentReturnResultQueryDTO) {
		const url = this.paymentService.verifyAndGetRedirectUrl(query)
		return { url: url.toString() }
	}
}
