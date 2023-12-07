export interface Order {
	orderId: string
	amount: number
	status: string
	paymentInfo: {
		vnp_Amount: number
		vnp_BankCode: string
		vnp_BankTranNo: string
		vnp_CardType: string
		vnp_OrderInfo: string
		vnp_PayDate: string
		vnp_ResponseCode: string
		vnp_TmnCode: string
		vnp_TransactionNo: string
		vnp_TransactionStatus: string
	}
}

const MOCK_ORDER_LIST = [
	{
		orderId: '123',
		amount: 100000,
		status: 'PENDING',
		paymentInfo: null,
	},
	{
		orderId: '456',
		amount: 200000,
		status: 'SUCCESS',
		paymentInfo: null,
	},
	{
		orderId: '789',
		amount: 300000,
		status: 'PAYMENT_FAILED',
		paymentInfo: null,
	},
]

export class OrderRepository {
	constructor() {}

	async save(order: Order): Promise<Order> {
		const index = MOCK_ORDER_LIST.findIndex(
			(orderItem) => orderItem.orderId === order.orderId,
		)
		if (index === -1) {
			MOCK_ORDER_LIST.push(order)
		} else {
			MOCK_ORDER_LIST[index] = order
		}
		return order
	}

	async getById(orderId: string): Promise<Order> {
		if (orderId.includes('PENDING')) {
			return {
				orderId: orderId,
				amount: 100000,
				status: 'PENDING',
				paymentInfo: null,
			}
		}
		if (orderId.includes('PAYMENT_FAILED')) {
			return {
				orderId: orderId,
				amount: 300000,
				status: 'PAYMENT_FAILED',
				paymentInfo: {
					vnp_Amount: 300000,
					vnp_BankCode: 'NCB',
					vnp_BankTranNo: '123456',
					vnp_CardType: 'ATM',
					vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
					vnp_PayDate: '20210611111111',
					vnp_ResponseCode: '01',
					vnp_TmnCode: '2QXUI4FK',
					vnp_TransactionNo: '123456',
					vnp_TransactionStatus: '01',
				},
			}
		}
		if (orderId.includes('SUCCESS')) {
			return {
				orderId: orderId,
				amount: 200000,
				status: 'SUCCESS',
				paymentInfo: {
					vnp_Amount: 300000,
					vnp_BankCode: 'NCB',
					vnp_BankTranNo: '123456',
					vnp_CardType: 'ATM',
					vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
					vnp_PayDate: '20210611111111',
					vnp_ResponseCode: '00',
					vnp_TmnCode: '2QXUI4FK',
					vnp_TransactionNo: '123456',
					vnp_TransactionStatus: '00',
				},
			}
		}
		return null
	}
}
