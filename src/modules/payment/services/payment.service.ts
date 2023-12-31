import { Inject, Injectable, Logger } from '@nestjs/common'
import * as qs from 'querystring'
import * as dateformat from 'dateformat'
import { GetPaymentUrlDTO } from './dtos/get-payment-url.dto'
import { PaymentModuleConfig, PaymentServiceConfig } from '../interfaces'
import { sortObject } from '../utils/sort-object'
import { getSecureHash } from '../utils/get-secure-hash'
import { PAYMENT_MODULE_CONFIG } from '../constants'
import { GetPaymentResultRedirectUrlDTO } from './dtos/get-payment-result-redirect-url.dto'
import { convertUTCToGMT7 } from '../utils/convert-to-local-time'

@Injectable()
export class PaymentService {
	private readonly logger = new Logger(PaymentService.name)
	private readonly config: PaymentServiceConfig
	constructor(
		@Inject(PAYMENT_MODULE_CONFIG)
		moduleConfig: PaymentModuleConfig,
	) {
		this.config = moduleConfig.serviceConfig
	}
	getPaymentUrl(dto: GetPaymentUrlDTO) {
		const { amount, ipAddress, orderInfo, orderType, orderId: tnxId } = dto
		const {
			apiUrl,
			apiVersion,
			merchantCode,
			paymentReturnUrl,
			durationInSecond,
			hashSecret,
		} = this.config

		const now = new Date()
		const createdDate = convertUTCToGMT7(now)
		const expiredDate = convertUTCToGMT7(
			new Date(now.getTime() + durationInSecond * 1000),
		)

		let params = {
			vnp_Version: apiVersion,
			vnp_Command: 'pay',
			vnp_TmnCode: merchantCode,
			vnp_Locale: 'vn',
			vnp_CurrCode: 'VND',
			vnp_TxnRef: tnxId,
			vnp_OrderInfo: encodeURI(orderInfo),
			vnp_OrderType: orderType,
			vnp_Amount: amount * 100,
			vnp_ReturnUrl: encodeURI(paymentReturnUrl),
			vnp_IpAddr: ipAddress,
			vnp_CreateDate: dateformat(createdDate, 'yyyymmddHHMMss'),
			vnp_ExpireDate: dateformat(expiredDate, 'yyyymmddHHMMss'),
		} as any

		const url = new URL(apiUrl)

		params = sortObject(params)
		const signData = qs.stringify(params)
		const signed = getSecureHash(signData, hashSecret)
		params['vnp_SecureHash'] = signed

		url.search = qs.stringify(params)

		this.logger.log('VNPAY payment URL: ' + url.toString())

		return url.toString()
	}

	verifyAndGetRedirectUrl(dto: GetPaymentResultRedirectUrlDTO) {
		// TODO: verify hash
		const { paymentResultRedirectUrl } = this.config
		const url = new URL(paymentResultRedirectUrl)
		url.searchParams.append('orderId', dto.vnp_TxnRef.toString())
		url.searchParams.append('status', dto.vnp_TransactionStatus)

		this.logger.log('VNPAY redirect result URL: ' + url.toString())
		return url.toString()
	}
}
