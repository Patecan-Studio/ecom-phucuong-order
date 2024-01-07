import {
	Body,
	Controller, Delete,
	Logger, Param,
	Patch, Post,
} from '@nestjs/common'
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiConfig, ProductModel, SuccessResponseDTO } from '@libs'
import { AddressRepository } from '@modules/address/repository/address.repository'
import {
	AddressResponseDto, CreatedAddressResponseDTO,
} from '@modules/address/controllers/dto/address-response.dto'
import { Address } from '@modules/address/model/address.model'

@Controller({
	path: '/address',
	version: '1',
})
@ApiConfig({
	useSuccessInterceptor: false,
})
@ApiTags('Address')
export class AddressController {
	private readonly logger: Logger = new Logger(AddressController.name)

	constructor(
		private readonly addressRepo: AddressRepository,
	) {

	}


	@Post()
	@ApiResponse({
		status: 201,
		type: CreatedAddressResponseDTO,
	})
	async saveAddress(@Body() dto: Address) {
		try {
			const address: Address  = dto
			console.log('Step 0: ' + JSON.stringify(address))
			let createdAddress = await this.addressRepo.create(address)
			return new CreatedAddressResponseDTO({
				resultCode: 201,
				message: 'Create/Update Address Success',
				data: createdAddress,
			})
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}

	@Patch('/active/:addressId')
	@ApiResponse({
		status: 200,
		type: AddressResponseDto,
	})
	async updateActiveAddress(
		@Param() addressId: string,
	) {
		try {
			const result = await this.addressRepo.updateActiveAddress({addressId})

			return new AddressResponseDto({
				resultCode: 200,
				message: 'Update Active Address Success',
				data: result,
			})
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}

	@Delete('/:addressId')
	@ApiResponse({
		status: 200,
		type: AddressResponseDto,
	})
	async deleteAddress(
		@Param() addressId: string,
	) {
		try {
			const result = await this.addressRepo.deleteAddress({addressId})

			return new AddressResponseDto({
				resultCode: 200,
				message: 'Delete Address Success',
				data: result,
			})
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
