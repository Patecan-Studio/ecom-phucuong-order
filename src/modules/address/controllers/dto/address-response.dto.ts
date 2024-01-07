import { ApiProperty, PartialType } from '@nestjs/swagger'
import { SuccessResponseDTO } from '@libs'
import { Cart } from '@modules/cart/model/cart.model'
import { Type } from 'class-transformer'
import { Address } from '@modules/address/model/address.model'

export class AddressResponseDto extends PartialType(SuccessResponseDTO) {
	@ApiProperty({
		type: Address,
	})
	@Type(() => Address)
	data: Address

	constructor(props: any) {
		super(props)
		Object.assign(this, props)
	}
}


export class CreatedAddressResponseDTO extends PartialType(SuccessResponseDTO) {
	@ApiProperty({
		type: Cart,
	})
	@Type(() => Cart)
	data: Cart

	constructor(props: any) {
		super(props)
		Object.assign(this, props)
	}
}
