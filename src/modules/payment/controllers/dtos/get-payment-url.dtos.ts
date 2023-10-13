import { SuccessResponseDTO } from '@libs'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class GetPaymentUrlQueryDTO {
	@ApiProperty()
	@Type(() => Number)
	@IsNotEmpty()
	amount: number

	@ApiProperty()
	@IsNotEmpty()
	orderInfo: string

	@ApiProperty()
	@IsNotEmpty()
	orderType: string

	@ApiProperty()
	@IsNotEmpty()
	orderId: string
}

export class GetPaymentUrlResponseDTO extends PartialType(SuccessResponseDTO) {
	@ApiProperty()
	url: string
}
