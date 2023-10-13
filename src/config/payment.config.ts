import { PAYMENT_MODULE_CONFIG, PaymentModuleConfig } from '@modules/payment'

export default () => ({
	[PAYMENT_MODULE_CONFIG]: {
		serviceConfig: {
			apiUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
			apiVersion: '2.1.0',
			durationInSecond: 900,
			hashSecret: process.env.VNPAY_HASH_SECRET,
			merchantCode: process.env.VNPAY_MERCHANT_CODE,
			paymentReturnUrl: process.env.PAYMENT_RETURN_URL,
			paymentResultRedirectUrl: process.env.PAYMENT_RESULT_REDIRECT_URL,
		},
	} as PaymentModuleConfig,
})
