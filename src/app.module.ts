import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { validateConfig } from './config'
import databaseConfig from './config/database.config'
import paymentConfig from './config/payment.config'
import { PaymentModule } from './modules/payment'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, paymentConfig],
			validate: validateConfig,
			envFilePath: '.env',
		}),
		PaymentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
