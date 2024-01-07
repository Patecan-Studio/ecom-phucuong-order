import { Module } from '@nestjs/common';
import { MongooseModule } from '@infras/mongoose';
import { orderSchema } from '@modules/order/schemas/order.model'
import { OrderRepository } from '@modules/order/repository/order.repository'
import { OrderController } from '@modules/order/controllers/order.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Orders',
        schema: orderSchema,
      },
    ]),
  ],
  providers: [OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
