import mongoose, { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ProductVariantStatus } from '@libs';

export const cartSchema = new mongoose.Schema(
  {
    productsList: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        sku: { type: String },
        product_brand_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Brand',
        },
        product_category_ids: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
          },
        ],
        product_name: { type: String },
        product_slug: { type: String },
        product_variant_image: { type: String },
        product_weight: { type: String },
        product_height: { type: String },
        product_width: { type: String },
        product_length: { type: String },
        product_size_unit: { type: String },
        variant: {
          sku: String,
          property_list: [
            {
              key: String,
              value: String,
            },
          ],
          price: Number,
          discount_price: Number,
          discount_percentage: Number,
          quantity: Number,
          image_list: [
            {
              imageName: String,
              imageUrl: String,
            },
          ],
          status: {
            type: String,
            default: ProductVariantStatus.Active,
            required: false,
          },
          metadata: {
            color: {
              label: String,
              value: String,
            },
            material: String,
            measurement: {
              width: Number,
              length: Number,
              height: Number,
              weight: Number,
              sizeUnit: String,
              weightUnit: String,
            },
          },
        },
        product_warranty: { type: String },
        qty: { type: Number },
        price: { type: Number },
        discount_price: { type: Number },
        discount_percentage: { type: Number },
        totalAfterDiscount: { type: Number },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    collection: 'Carts',
    timestamps: true,
  },
);

const CartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default CartModel;
