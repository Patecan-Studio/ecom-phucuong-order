import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Inject,
	Logger,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiConfig, ProductModel, SuccessResponseDTO } from '@libs'

import { CartRepository } from '@modules/cart/repository/cart.repository'
import CartDto from '@modules/cart/dto/cart.dto'
import { CreatedCartResponseDTO } from '@modules/cart/controllers/dto/cart-response.dto'

@Controller({
	path: '/carts',
	version: '1',
})
@ApiConfig({
	useSuccessInterceptor: false,
})
@ApiTags('Cart')
export class CartController {
	private readonly logger: Logger = new Logger(CartController.name)

	constructor(
		private readonly cartRepo: CartRepository,
	) {

	}

	@Post()
	@ApiResponse({
		status: 201,
		type: CreatedCartResponseDTO,
	})
	async saveCart(@Body() dto: CartDto) {

		try {
			const { cart } = dto
			console.log('Step 0: ' + JSON.stringify(cart))
			let createdCart = await this.cartRepo.create(cart)
			return new CreatedCartResponseDTO({
				resultCode: 201,
				message: 'Create/Update Cart Success',
				data: createdCart,
			})
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
