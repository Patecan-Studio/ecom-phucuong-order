import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

// Define the UserModel model

const userSchema = new mongoose.Schema(
  {
    // @ts-ignore
    name: {
      type: String,
      required: true,
    },
      // @ts-ignore
      email: {
          type: String,
          required: true,
          trim: true,
          unique: true,
      },
    // @ts-ignore
    password: {
      type: String,
      required: 'Please enter a password.',
    },
    // @ts-ignore
    role: {
      type: String,
      default: 'user',
    },
    // @ts-ignore
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png',
    },
    // @ts-ignore
    emailVerified: {
      type: Boolean,
      default: false,
    },
    // @ts-ignore
    defaultPaymentMethod: {
      type: String,
      default: '',
    },
    address: [
      {
        // @ts-ignore
        firstName: {
          type: String,
        },
        // @ts-ignore
        lastName: {
          type: String,
        },
        // @ts-ignore
        phoneNumber: {
          type: String,
        },
        // @ts-ignore
        email: {
          type: String,
        },
        // @ts-ignore
        country: {
          type: String,
        },
        // @ts-ignore
        city: {
          type: String,
        },
        // @ts-ignore
        district: {
          type: String,
        },
        // @ts-ignore
        ward: {
          type: String,
        },
        // @ts-ignore
        address1: {
          type: String,
        },
        // @ts-ignore
        zipCode: {
          type: String,
        },
        // @ts-ignore
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          // @ts-ignore
          type: ObjectId,
          ref: 'Product',
        },
        // @ts-ignore
        style: {
          type: String,
        },
      },
    ],
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
