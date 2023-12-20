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
import { MongoObjectIdParam } from '../../../libs/dtos/mongo-object-id.dto'
import { Cart, CartItem } from '@modules/cart/model/cart.model'
import { BrandNotFoundException } from '../../../libs/errors/brand.errors'
import { CartNotFoundException, UserCartNotFoundException } from '@modules/cart/exceptions/cart.exception'

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

	@Get('/:userId')
	@ApiResponse({
		status: 200
	})
	async getUserCart(@Param() userId: string): Promise<CartDto> {
		const cart = await this.cartRepo.getUserCart(userId)
		if (!cart) {
			throw new UserCartNotFoundException(userId)
		}
		return new Cart(cart)
	}

	@Post()
	@ApiResponse({
		status: 201,
		type: CreatedCartResponseDTO,
	})
	async saveCart(@Body() dto: CartItem[]) {
		console.log('Step 0: ' + JSON.stringify(dto))
		try {
			const cart: CartItem[]  = dto
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
