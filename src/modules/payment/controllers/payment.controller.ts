import { Controller, Get, Query } from '@nestjs/common'
import { PaymentService } from '../services/payment.service'
import {
	GetPaymentUrlQueryDTO,
	GetPaymentUrlResponseDTO,
} from './dtos/get-payment-url.dtos'
import { GetPaymentUrlDTO } from '../services/dtos/get-payment-url.dto'
import { ClientIp } from 'src/libs/decorators'
import { ApiResponse } from '@nestjs/swagger'

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Get('/url')
	@ApiResponse({
		status: 200,
		type: GetPaymentUrlResponseDTO,
	})
	getPaymentUrl(
		@Query() q: GetPaymentUrlQueryDTO,
		@ClientIp() ipAddr: string,
	): GetPaymentUrlResponseDTO {
		const dto: GetPaymentUrlDTO = {
			...q,
			ipAddress: ipAddr,
		}
		const paymentUrl = this.paymentService.getPaymentUrl(dto)

		return { url: paymentUrl }
	}

	@Get('/returnResult')
	redirectPaymentResult() {
		console.log('hello world')
		return { RspCode: '00', Message: 'success' }
	}
}
