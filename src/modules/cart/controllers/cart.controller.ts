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
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiConfig, SuccessResponseDTO } from '@libs';

import mongoose from 'mongoose';
import CartRequestDTO from '@modules/cart/dto/CartRequestDTO';
import ProductInCheckout from '@modules/cart/dto/product-in-checkout';
import CartModel from '@modules/cart/schemas/cart.model';
import UserModel from '../../../libs/schemas/user.model'

@Controller({
  path: '/cart',
  version: '1',
})
@ApiConfig({
  useSuccessInterceptor: false,
})
@ApiTags('Cart')
export class CartController {
  private readonly logger: Logger = new Logger(CartController.name);
  // constructor(
  // 	private readonly brandRepo: BrandRepository,
  // ) {
  // }

  @Post('/saveCart')
  async saveCart(@Body() dto: CartRequestDTO) {
    try {
      console.log('Step 1');

      const { cart } = dto;
      const user_id = '655609014186e2628008b45d';

      const productsListInCheckout: ProductInCheckout[] = [];
      console.log('Step 1.1');
      try {

        const user = await UserModel.findById(user_id);
        console.log('Step 1.2');
        console.log('Step 2: ' + JSON.stringify(user));

        let existingCart = await CartModel.findOne({ user: user_id });
        console.log('Step 3');
      } catch (e) {
        console.log(e);
      }

      //
      // for (let i = 0; i < cart.length; i++) {
      // 	let dbProduct: any = await ProductModel.findById(cart[i]._id).lean();
      // 	console.log("Step 4: " + JSON.stringify(dbProduct));
      //
      // 	let variant = dbProduct.product_variants.find(
      // 		(v: any) => v.sku === cart[i]._uid
      // 	);
      // 	console.log("Step 4.0: " + JSON.stringify(variant.property_list));
      //
      // 	let tempProduct: ProductInCheckout = {};
      // 	tempProduct.variant = variant;
      // 	tempProduct.variant = variant;
      // 	console.log("Step 4.1: " + JSON.stringify(tempProduct.variant));
      // 	tempProduct.product_id = dbProduct._id;
      // 	console.log("Step 5.1: " + JSON.stringify(tempProduct));
      // 	tempProduct.sku = variant.sku;
      // 	console.log("Step 5.2: " + JSON.stringify(tempProduct));
      // 	tempProduct.product_brand_id = dbProduct.product_brand;
      // 	tempProduct.product_category_ids = dbProduct.product_categories.map(
      // 		(c: any) => c._id
      // 	);
      // 	tempProduct.product_name = dbProduct.product_name;
      // 	tempProduct.product_slug = dbProduct.product_slug;
      // 	tempProduct.product_variant_image = variant.image_list[0].imageUrl;
      // 	console.log("Step 5.3: " + JSON.stringify(tempProduct));
      // 	tempProduct.product_weight = `${variant.metadata.measurement.weight} ${variant.metadata.measurement.weightUnit}`;
      // 	tempProduct.product_width = variant.metadata.measurement.width;
      // 	tempProduct.product_length = variant.metadata.measurement.length;
      // 	tempProduct.product_height = variant.metadata.measurement.height;
      // 	tempProduct.product_size_unit = variant.metadata.measurement.sizeUnit;
      // 	console.log("Step 5.4: " + JSON.stringify(tempProduct));
      // 	tempProduct.product_warranty = dbProduct.product_warranty;
      // 	console.log("Step 5.5: " + JSON.stringify(tempProduct));
      // 	tempProduct.qty = Number(cart[i].qty);
      // 	tempProduct.price = variant.price;
      // 	tempProduct.discount_price = variant.discount_price;
      // 	tempProduct.discount_percentage = variant.discount_percentage;
      //
      // 	productsListInCheckout.push(tempProduct);
      // }
      //
      // console.log("Step 5: " + JSON.stringify(productsListInCheckout));
      //
      // let cartTotal = 0;
      //
      // for (let i = 0; i < productsListInCheckout.length; i++) {
      // 	// @ts-ignore
      // 	cartTotal +=
      // 		productsListInCheckout[i].price * productsListInCheckout[i].qty;
      // }
      // console.log("Step 6: " + cartTotal);
      //
      // let cartTotalAfterDiscount = cartTotal;
      //
      // for (let i = 0; i < productsListInCheckout.length; i++) {
      // 	// @ts-ignore
      // 	cartTotalAfterDiscount +=
      // 		productsListInCheckout[i].discount_price *
      // 		productsListInCheckout[i].qty;
      // }
      //
      // console.log("Step 7: " + cartTotalAfterDiscount);
      //
      // const raw = new CartModel({
      // 	productsList: productsListInCheckout,
      // 	cartTotal: cartTotal,
      // 	totalAfterDiscount: cartTotalAfterDiscount,
      // 	user: user_id,
      // });
      //
      // let result: any = null;
      // if (existingCart) {
      // 	result = await CartModel.findOneAndUpdate(
      // 		{ user: user_id },
      // 		{
      // 			productsList: productsListInCheckout,
      // 			cartTotal: cartTotal,
      // 			totalAfterDiscount: cartTotalAfterDiscount,
      // 		}
      // 	);
      // } else {
      // 	result = await raw.save();
      // }
      //
      // db.disconnectDb();

      return {};
    } catch (e: any) {
      return {
        status: 500,
      };
    }
  }
}
