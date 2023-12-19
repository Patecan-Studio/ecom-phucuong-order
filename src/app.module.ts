import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule, DATABASE_CONFIG } from './config'
import { PaymentModule } from '@modules/payment';
import { CartModule } from '@modules/cart';
import { MongooseModule } from '@infras/mongoose'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [AppConfigModule,

    MongooseModule.forRootAsync({
      useFactory: (configSevice: ConfigService) =>
          configSevice.get(DATABASE_CONFIG),
      inject: [ConfigService],
    }),
    PaymentModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
