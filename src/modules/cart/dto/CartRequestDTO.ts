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

interface CartItem {
  _id: string;
  _uid: string;
  qty: number;
  product_brand: Brand;
  product_name: string;
  product_description: string;
  product_banner_image: string;
  product_slug: string;
  product_categories: Category[];
  product_variants: Variant[];
  product_warranty: string;
  variant: Variant;
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

export default interface CartRequestDTO {
  cart: CartItem[];
}
