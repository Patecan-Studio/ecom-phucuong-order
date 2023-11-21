import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from './config'
import { PaymentModule } from './modules/payment'

@Module({
	imports: [AppConfigModule, PaymentModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
