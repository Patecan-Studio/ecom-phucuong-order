import { Injectable, Logger } from '@nestjs/common'
import mongoose, { Types } from 'mongoose'
import UserModel from '../../../libs/schemas/user.model'
import { AddressNotExistedException, CannotAddNewAddressException } from '@modules/address/exceptions/address.exception'
import { Address } from '@modules/address/model/address.model'
import { MongoDBErrorHandler } from '@infras/mongoose'
import { BrandExistsException } from '../../../libs/errors/brand.errors'
import cartModel from '@modules/cart/schemas/cart.model'


@Injectable()
export class AddressRepository {
	private logger: Logger = new Logger(AddressRepository.name)

	async create(address: Partial<Address>): Promise<Address> {
		console.log('address: ' + JSON.stringify(address))
		try {
			const user_id = '655609014186e2628008b45d'

			const options: object = {
				returnDocument: 'after', // This option returns the updated document
			}

			const updatedDocument = await UserModel.findOneAndUpdate({ _id: user_id }, { $push: { address: address } }, options)

			if (!updatedDocument) {
				throw new CannotAddNewAddressException()
			}

			return updatedDocument.toObject({
				versionKey: false,
				flattenObjectIds: true,
				transform: (doc, ret) => {
					delete ret.__v
				},
			})
		} catch (error) {
			this.logger.error(error)
			if (MongoDBErrorHandler.isDuplicatedKeyError(error, 'brand_name')) {
				throw new BrandExistsException(cartModel.name)
			}
			throw error
		}
	}

	async updateActiveAddress(payload: any): Promise<any> {
		const user_id = '655609014186e2628008b45d'
		const user = await UserModel.findById(user_id)

		const userAddresses: Address[] = user.address
		const { addressId } = payload
		console.log(addressId['addressId'])

		const activeAddressIndex = userAddresses.findIndex((address: Address) => address._id.equals(new Types.ObjectId(addressId['addressId'])))


		console.log(activeAddressIndex)

		if (activeAddressIndex === -1) {
			throw new AddressNotExistedException(addressId)
		}
		//
		//
		for (let i = 0; i < userAddresses.length; i++) {
			if (i === activeAddressIndex) {
				userAddresses[i].active = true
			} else {
				userAddresses[i].active = false
			}
		}

		const result = await UserModel.findByIdAndUpdate(
			user_id,
			{
				$set: {
					'address': userAddresses,
				},
			},
		)

		return result.toObject({
			flattenObjectIds: true,
		})
	}

	async deleteAddress(payload: any): Promise<any> {
		const user_id = '655609014186e2628008b45d'
		const user = await UserModel.findById(user_id)

		const userAddresses: Address[] = user.address


		const { addressId } = payload
		const formattedAddressId = new Types.ObjectId(addressId['addressId'])


		const newAddress = userAddresses.filter((address) => !address._id.equals(formattedAddressId))

		const result = await UserModel.findByIdAndUpdate(
			user_id,
			{ $pull: { address: { _id: formattedAddressId } } },
			{ new: true },
		)

		console.log('DELETED ADDRESS RESULT: ' + JSON.stringify(result.toObject({
			flattenObjectIds: true,
		})))


		return result.toObject({
			flattenObjectIds: true,
		})
	}

}
