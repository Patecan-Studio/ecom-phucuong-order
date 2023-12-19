import { ApiProperty, PartialType } from '@nestjs/swagger'
import { SuccessResponseDTO } from '@libs'
import { Type } from 'class-transformer'
import { Cart } from '@modules/cart/model/cart.model'

export class CreatedCartResponseDTO extends PartialType(SuccessResponseDTO) {
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
