import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Brand, Category } from '@libs'
import { Variant } from '@modules/cart/dto/cart.dto'

export class CartItem {
	@ApiProperty()
	@IsNotEmpty()
	_id: string;

	@ApiProperty()
	_uid: string;

	@ApiProperty()
	@IsNotEmpty()
	qty: number;

	@ApiProperty()
	product_brand: Brand;

	@ApiProperty()
	product_name: string;

	@ApiProperty()
	product_description: string;

	@ApiProperty()
	product_banner_image: string;

	@ApiProperty()
	product_slug: string;

	@ApiProperty()
	product_categories: Category[];

	@ApiProperty()
	product_variants: Variant[];

	@ApiProperty()
	product_warranty: string;

	@ApiProperty()
	variant: Variant;
}

export class Cart {
	constructor(public cart: CartItem[]) {}
}
