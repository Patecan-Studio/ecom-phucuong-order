import mongoose, { Document, Schema, Types } from 'mongoose';
import ProductInCheckoutModel from '@modules/cart/model/product-in-checkout.model'
import { Address } from '@modules/address/model/address.model'
import { ApiProperty } from '@nestjs/swagger'
import { CartItem } from '@modules/cart/model/cart.model'





export class Order {

	constructor(props: any) {
		Object.assign(this, props)
	}

	@ApiProperty()
	_id: Types.ObjectId | null;

	@ApiProperty()
	user: Types.ObjectId;

	@ApiProperty()
	productsList: ProductInCheckoutModel[];

	@ApiProperty()
	shippingAddress: Address;

	@ApiProperty()
	paymentMethod: String;

	@ApiProperty()
	paymentResult: String;

	@ApiProperty()
	total: Number;

	@ApiProperty()
	totalBeforeDiscount: Number;

	@ApiProperty()
	couponApplied: String;

	@ApiProperty()
	shippingPrice: Number | 0.0;

	@ApiProperty()
	taxPrice: Number | null;

	@ApiProperty()
	isPaid: Boolean | false;

	@ApiProperty()
	status: {
		type: String,
		default: "Not Processed",
		enum: [
			"Not Processed",
			"Processing",
			"Dispatched",
			"Cancelled",
			"Completed",
		],
	};

	@ApiProperty()
	paidAt: Date;

	@ApiProperty()
	deliveredAt: Date;
}
