import { Variant } from '@modules/cart/dto/CartRequestDTO';

export default interface ProductInCheckout {
  product_id?: string;
  sku?: string;
  product_brand_id?: string;
  product_category_ids?: string[];
  product_name?: string;
  product_slug?: string;
  product_variant_image?: string;
  product_weight?: string;
  product_height?: number;
  product_width?: number;
  product_length?: number;
  product_size_unit?: string;
  variant: Variant;
  product_warranty?: string;
  qty?: number;
  price?: number;
  discount_price?: number;
  discount_percentage?: number;
  totalAfterDiscount?: number;
}
