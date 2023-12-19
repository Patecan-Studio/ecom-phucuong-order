import { Module } from '@nestjs/common';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { MongooseModule } from '@infras/mongoose';
import { cartSchema } from '@modules/cart/schemas/cart.model'
import { CartRepository } from '@modules/cart/repository/cart.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Carts',
        schema: cartSchema,
      },
    ]),
  ],
  providers: [CartRepository],
  controllers: [CartController],
})
export class CartModule {}
