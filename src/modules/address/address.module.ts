import { Module } from '@nestjs/common';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { MongooseModule } from '@infras/mongoose';
import { cartSchema } from '@modules/cart/schemas/cart.model'
import { CartRepository } from '@modules/cart/repository/cart.repository'
import { AddressRepository } from '@modules/address/repository/address.repository'
import { AddressController } from '@modules/address/controllers/address.controller'

@Module({
  providers: [AddressRepository],
  controllers: [AddressController],
})
export class AddressModule {}
