import { isValidObjectId } from 'mongoose'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'mongoObjectId', async: false })
export class ValidateMongoObjectId implements ValidatorConstraintInterface {
	validate(text: string, args: ValidationArguments) {
		return isValidObjectId(text)
	}

	defaultMessage(args: ValidationArguments) {
		// here you can provide default error message if validation failed
		return 'Invalid ObjectId'
	}
}
