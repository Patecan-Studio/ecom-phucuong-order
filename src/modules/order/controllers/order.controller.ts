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

import { OrderRepository } from '@modules/order/repository/order.repository'
import { Order } from '@modules/order/model/order.model'
import { CreatedOrderResponseDTO, GetOrderResponseDTO } from '@modules/order/controllers/dto/order-response.dto'
import { OrderNotFoundException } from '@modules/order/exceptions/order.exception'

@Controller({
	path: '/orders',
	version: '1',
})
@ApiConfig({
	useSuccessInterceptor: false,
})
@ApiTags('Order')
export class OrderController {
	private readonly logger: Logger = new Logger(OrderController.name)

	constructor(
		private readonly orderRepo: OrderRepository,
	) {

	}

	@Get('/:orderId')
	@ApiResponse({
		status: 200,
		type: GetOrderResponseDTO,
	})
	async getUserCart(@Param('orderId') orderId: string): Promise<GetOrderResponseDTO> {
		console.log("order ID: "+ JSON.stringify(orderId));
		const order = await this.orderRepo.getOneUserOrder(orderId);
		if (!order) {
			throw new OrderNotFoundException(orderId)
		}

		return new GetOrderResponseDTO({
			resultCode: 200,
			message: 'Retrieve Order Success',
			data: order,
		});
	}

	@Post()
	@ApiResponse({
		status: 201,
		type: CreatedOrderResponseDTO,
	})
	async saveOrder(@Body() dto: Order) {

		try {
			const order: Order  = dto
			console.log('Step 0: ' + JSON.stringify(order))

			let createdOrder = await this.orderRepo.create(order)
			return new CreatedOrderResponseDTO({
				resultCode: 201,
				message: 'Create Order Success',
				data: createdOrder,
			});

		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
