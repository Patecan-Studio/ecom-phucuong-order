import { Injectable, Logger } from '@nestjs/common'
import { Order } from '@modules/order/model/order.model'
import OrderModel from '@modules/order/schemas/order.model'
import UserModel from '../../../libs/schemas/user.model'
import CartModel from '@modules/cart/schemas/cart.model'
import { Types } from 'mongoose'


@Injectable()
export class OrderRepository {
	private logger: Logger = new Logger(OrderRepository.name)


	async getOneUserOrder(orderId: string): Promise<any> {
		console.log("ORDER ID: "+ orderId);
		const user = await UserModel.findById("655609014186e2628008b45d").select('-__v');
		console.log("GET DATA USER: "+user._id);

		const order = await OrderModel.findById( orderId)
			.populate({path: "user", model: UserModel})
			.select('-__v');

		console.log("GET ORDER DATA: "+ JSON.stringify(order));

		return order;
	}


	async create(order: Partial<Order>): Promise<Order> {
		console.log('ORDER: ' + JSON.stringify(order))
		try {
			const user_id = '655609014186e2628008b45d'

			const options: object = {
				returnDocument: 'after', // This option returns the updated document
			}

			const raw = new OrderModel({
				user: user_id,
				productsList: order.productsList,
				shippingAddress: order.shippingAddress,
				paymentMethod: order.paymentMethod,
				paymentResult: order.paymentResult,
				total: order.total,
				totalBeforeDiscount: order.totalBeforeDiscount,
				couponApplied: order.couponApplied,
				shippingPrice: order.shippingPrice,
				taxPrice: order.taxPrice,
				isPaid: order.isPaid,
				status: order.status,
				paidAt: order.paidAt,
				deliveredAt: order.deliveredAt
			});

			let result: any = null;


			result = await raw.save();

			return result.toObject({
				versionKey: false,
				flattenObjectIds: true,
				transform: (doc, ret) => {
					delete ret.__v
				},
			})

		} catch (error) {
			this.logger.error(error)
			// if (MongoDBErrorHandler.isDuplicatedKeyError(error, 'brand_name')) {
			// 	throw new BrandExistsException(cartModel.name)
			// }
			throw error
		}
	}

}
