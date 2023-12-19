import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CartItem } from '@modules/cart/model/cart.model'

interface Image {
  imageName: string;
  imageUrl: string;
}

interface Metadata {
  color: {
    label: string;
    value: string;
  };
  material: string;
  measurement: {
    width: number;
    length: number;
    height: number;
    weight: number;
    sizeUnit: string;
    weightUnit: string;
  };
}

export interface Variant {
  sku: string;
  property_list: object[];
  price: number;
  discount_price: number;
  discount_percentage: number | 0;
  quantity: number;
  image_list: object[];
  status: string;
  metadata: Metadata;
}

interface Category {
  _id: string;
  category_name: string;
  category_logoUrl: string;
}

interface Brand {
  _id: string;
  brand_name: string;
  brand_logoUrl: string;
}

interface Metadata {
  color: {
    label: string;
    value: string;
  };
  material: string;
  measurement: {
    width: number;
    length: number;
    height: number;
    weight: number;
    sizeUnit: string;
    weightUnit: string;
  };
}

export default interface CartDto {
  cart: CartItem[];
}
