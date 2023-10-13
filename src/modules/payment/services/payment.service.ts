import { Inject, Injectable } from '@nestjs/common'
import * as qs from 'querystring'
import * as dateformat from 'dateformat'
import { GetPaymentUrlDTO } from './dtos/get-payment-url.dto'
import { PaymentModuleConfig, PaymentServiceConfig } from '../interfaces'
import { sortObject } from '../utils/sort-object'
import { getSecureHash } from '../utils/get-secure-hash'
import { PAYMENT_MODULE_CONFIG, PAYMENT_SERVICE_CONFIG } from '../constants'
import { GetPaymentResultRedirectUrlDTO } from './dtos/get-payment-result-redirect-url.dto'

@Injectable()
export class PaymentService {
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

		const createdDate = new Date()
		const expiredDate = new Date(
			createdDate.getTime() + durationInSecond * 1000,
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

		return url.toString()
	}

	getPaymentResultRedirectUrl(dto: GetPaymentResultRedirectUrlDTO) {
		const { paymentResultRedirectUrl } = this.config
		const url = new URL(paymentResultRedirectUrl)
		url.searchParams.append('orderId', dto.vnp_TxnRef.toString())
		url.searchParams.append('status', dto.vnp_TransactionStatus)
		return url.toString()
	}
}
