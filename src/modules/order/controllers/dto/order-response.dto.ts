import { ApiProperty, PartialType } from '@nestjs/swagger'
import { SuccessResponseDTO } from '@libs'
import { Type } from 'class-transformer'
import { Order } from '@modules/order/model/order.model'

export class CreatedOrderResponseDTO extends PartialType(SuccessResponseDTO) {
	@ApiProperty({
		type: Order,
	})
	@Type(() => Order)
	data: Order

	constructor(props: any) {
		super(props)
		Object.assign(this, props)
	}
}



export class GetOrderResponseDTO extends PartialType(SuccessResponseDTO) {
	@ApiProperty({
		type: Order,
	})
	@Type(() => Order)
	data: Order

	constructor(props: any) {
		super(props)
		Object.assign(this, props)
	}
}

