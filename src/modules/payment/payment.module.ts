import { Module } from '@nestjs/common'
import { PaymentService } from './services'
import { PaymentController } from './controllers/payment.controller'
import { PAYMENT_MODULE_CONFIG } from './constants'
import { ConfigService } from '@nestjs/config'
import { OrderRepository } from './database/order.repository'

@Module({
	providers: [
		PaymentService,
		{
			provide: PAYMENT_MODULE_CONFIG,
			useFactory: (configService: ConfigService) =>
				configService.get(PAYMENT_MODULE_CONFIG),
			inject: [ConfigService],
		},
		OrderRepository,
	],
	controllers: [PaymentController],
})
export class PaymentModule {}
