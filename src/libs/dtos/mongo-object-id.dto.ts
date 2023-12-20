import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Validate } from 'class-validator'
import { ValidateMongoObjectId } from '../validator/is-mongo-object-id.validator'

export class MongoObjectIdParam {
	@ApiProperty()
	@Validate(ValidateMongoObjectId, {
		message: 'Invalid Mongo ID',
	})
	@IsNotEmpty()
	id: string
}
