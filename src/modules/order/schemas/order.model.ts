import mongoose from 'mongoose';
import { ProductVariantStatus } from '@libs'

const { ObjectId } = mongoose.Schema;



export const orderSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        productsList: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                sku: { type: String },
                product_brand_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Brand",
                },
                product_category_ids: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Category",
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
                            value:String
                        }
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
                            value: String
                        },
                        material: String,
                        measurement: {
                            width: Number,
                            length: Number,
                            height: Number,
                            weight: Number,
                            sizeUnit: String,
                            weightUnit: String
                        }
                    }
                },
                product_warranty: { type: String },
                qty: { type: Number },
                price: { type: Number },
                discount_price: { type: Number },
                discount_percentage: { type: Number },
                totalAfterDiscount: { type: Number },
            },
        ],
        shippingAddress: {

            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            email: {
                type: String,
            },
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            district:{
                type: String,
            },
            ward: {
                type: String,
            },
            address1: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            active: {
                type: Boolean,
                default: false,
            },
        },
        paymentMethod: {
            type: String,
        },
        paymentResult: {
            id: String,
            status: String,
            email: String,
        },
        total: {
            type: Number,
            required: true,
        },
        totalBeforeDiscount: {
            type: Number,
        },
        couponApplied: {
            type: String,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        taxPrice: {
            type: Number,
            default: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Completed",
            ],
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        collection: "Orders",
        timestamps: true,
    }
);

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;

