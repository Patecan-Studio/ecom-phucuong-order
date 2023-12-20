import { Injectable, Logger } from '@nestjs/common'
import mongoose from 'mongoose'
import CartDto from '@modules/cart/dto/cart.dto'
import ProductInCheckoutModel from '@modules/cart/model/product-in-checkout.model'
import UserModel from '../../../libs/schemas/user.model'
import CartModel from '@modules/cart/schemas/cart.model'
import { ProductModel } from '@libs'
import { MongoDBErrorHandler } from '@infras/mongoose'
import { BrandExistsException } from '../../../libs/errors/brand.errors'
import cartModel from '@modules/cart/schemas/cart.model'
import { CartItem } from '@modules/cart/model/cart.model'


@Injectable()
export class CartRepository {
	private logger: Logger = new Logger(CartRepository.name)
	constructor() {}

	async create(cartItems: Partial<CartItem[]>): Promise<CartDto> {
		try {
			console.log('Step 1');

			const user_id = '655609014186e2628008b45d';

			const productsListInCheckout: ProductInCheckoutModel[] = [];
			console.log('Step 1.1');


			const user = await UserModel.findById(user_id);
			console.log('Step 1.2');
			console.log('Step 2: ' + JSON.stringify(user));

			let existingCart = await CartModel.findOne({ user: user_id });
			console.log('Step 3');


			for (let i = 0; i < cartItems.length; i++) {
				let cart: CartItem = cartItems[i];
				let dbProduct: any = await ProductModel.findById(cart._id).lean();
				console.log("Step 4: " + JSON.stringify(dbProduct));

				let variant = dbProduct.product_variants.find(
					(v: any) => v.sku === cart._uid
				);
				console.log("Step 4.0: " + JSON.stringify(variant.property_list));

				let tempProduct: ProductInCheckoutModel = new ProductInCheckoutModel();

				tempProduct.variant = variant;
				tempProduct.variant = variant;
				console.log("Step 4.1: " + JSON.stringify(tempProduct.variant));
				tempProduct.product_id = dbProduct._id;
				console.log("Step 5.1: " + JSON.stringify(tempProduct));
				tempProduct.sku = variant.sku;
				console.log("Step 5.2: " + JSON.stringify(tempProduct));
				tempProduct.product_brand_id = dbProduct.product_brand;
				tempProduct.product_category_ids = dbProduct.product_categories.map(
					(c: any) => c._id
				);
				tempProduct.product_name = dbProduct.product_name;
				tempProduct.product_slug = dbProduct.product_slug;
				tempProduct.product_variant_image = variant.image_list[0].imageUrl;
				console.log("Step 5.3: " + JSON.stringify(tempProduct));
				tempProduct.product_weight = `${variant.metadata.measurement.weight} ${variant.metadata.measurement.weightUnit}`;
				tempProduct.product_width = variant.metadata.measurement.width;
				tempProduct.product_length = variant.metadata.measurement.length;
				tempProduct.product_height = variant.metadata.measurement.height;
				tempProduct.product_size_unit = variant.metadata.measurement.sizeUnit;
				console.log("Step 5.4: " + JSON.stringify(tempProduct));
				tempProduct.product_warranty = dbProduct.product_warranty;
				console.log("Step 5.5: " + JSON.stringify(tempProduct));
				tempProduct.qty = Number(cart.qty);
				tempProduct.price = variant.price;
				tempProduct.discount_price = variant.discount_price;
				tempProduct.discount_percentage = variant.discount_percentage;

				productsListInCheckout.push(tempProduct);
			}

			console.log("Step 5: " + JSON.stringify(productsListInCheckout));

			let cartTotal = 0;

			for (let i = 0; i < productsListInCheckout.length; i++) {
				cartTotal +=
					productsListInCheckout[i].price * productsListInCheckout[i].qty;
			}
			console.log("Step 6: " + cartTotal);

			let cartTotalAfterDiscount = cartTotal;

			for (let i = 0; i < productsListInCheckout.length; i++) {
				cartTotalAfterDiscount +=
					productsListInCheckout[i].discount_price *
					productsListInCheckout[i].qty;
			}

			console.log("Step 7: " + cartTotalAfterDiscount);

			const raw = new CartModel({
				productsList: productsListInCheckout,
				cartTotal: cartTotal,
				totalAfterDiscount: cartTotalAfterDiscount,
				user: user_id,
			});

			let result: any = null;
			if (existingCart) {
				result = await CartModel.findOneAndUpdate(
					{ user: user_id },
					{
						productsList: productsListInCheckout,
						cartTotal: cartTotal,
						totalAfterDiscount: cartTotalAfterDiscount,
					}
				);
			} else {
				result = await raw.save();
			}
			return result.toObject({
				versionKey: false,
				flattenObjectIds: true,
				transform: (doc, ret) => {
					delete ret.__v
				},
			})
		} catch (error) {
			this.logger.error(error)
			if (MongoDBErrorHandler.isDuplicatedKeyError(error, 'brand_name')) {
				throw new BrandExistsException(cartModel.name)
			}
			throw error
		}
	}

	async getUserCart(userId: string): Promise<any> {
		const user = await UserModel.findById("655609014186e2628008b45d").select('-__v');
		console.log("GET DATA USER: "+user._id);
		const cart = await CartModel.findOne({ user: user._id }).select('-__v');
		console.log("GET DATA CART: "+ JSON.stringify(cart));

		return cart;
	}
}
