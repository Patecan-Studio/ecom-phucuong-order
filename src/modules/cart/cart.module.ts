import { Module } from '@nestjs/common';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { MongooseModule } from '@infras/mongoose';
import { cartSchema } from '@modules/cart/schemas/cart.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Carts',
        schema: cartSchema,
      },
    ]),
  ],
  controllers: [CartController],
})
export class CartModule {}
