import { BaseException } from '@libs'

export class AddressNotExistedException extends BaseException {
	public code = 'ADDRESS_NOT_EXISTED';

	constructor(addressId: string) {
		super(`Address with id '${addressId}' not existed anymore`);
	}
}

export class CannotAddNewAddressException extends BaseException {
	public code = 'CANNOT_ADD_NEW_ADDRESS';

	constructor() {
		super(`Cannot add new Address anymore`);
	}
}


