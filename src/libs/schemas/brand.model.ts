import mongoose, { Schema } from 'mongoose';
import { BRAND_MODEL } from '../constants';

export const brandSchema = new Schema(
  {
    brand_name: {
      type: String,
      trim: true,
      maxLength: 350,
      required: true,
      unique: true,
    },
    brand_description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    brand_logoUrl: {
      type: String,
      trim: true,
      default: 'https://via.placeholder.com/150',
    },
    brand_images: [
      {
        imageName: { type: String },
        imageUrl: { type: String },
      },
    ],
    brand_isActive: { type: Boolean, default: true },
    isMarkedDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'Brands',
  },
);

export interface Brand {
  _id: string;
  brand_name: string;
  brand_description: string;
  brand_logoUrl: string;
  brand_images: {
    imageName: string;
    imageUrl: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const textIndexOptions = {
  default_language: 'none',
  wildcard: 'text',
  textSearchDefaultOperator: 'or',
  minWordLength: 1,
};

// Create Index //
brandSchema.index(
  { brand_name: 'text', brand_description: 'text' },
  textIndexOptions,
);

export const BrandModel = mongoose.model(BRAND_MODEL, brandSchema);
