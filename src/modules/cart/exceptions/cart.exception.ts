import { BaseException } from '@libs'

export class CartNotFoundException extends BaseException {
	public code = 'CART_NOT_FOUND';

	constructor(cartId: string) {
		super(`Cart with id '${cartId}' not found`);
	}
}

export class UserCartNotFoundException extends BaseException {
	public code = 'USER_CART_NOT_FOUND';

	constructor(userId: string) {
		super(`Cart with user id '${userId}' not found`);
	}
}

