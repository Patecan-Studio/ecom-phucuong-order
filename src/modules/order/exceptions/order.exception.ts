import { BaseException } from '@libs'

export class OrderNotFoundException extends BaseException {
	public code = 'ORDER_NOT_FOUND';

	constructor(orderId: string) {
		super(`Order with ID '${orderId}' not found`);
	}
}


