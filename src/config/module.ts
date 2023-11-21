import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from './database.config'
import { validateConfig } from './config-validator'
import paymentConfig from './payment.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, paymentConfig],
			validate: validateConfig,
			envFilePath: '.env',
		}),
	],
})
export class AppConfigModule {}
