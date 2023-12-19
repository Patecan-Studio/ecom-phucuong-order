import { SuccessResponseDTO } from '@libs';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetPaymentUrlQueryDTO {
  @ApiProperty({
    description: 'The amount of money to pay',
    required: true,
    example: 100000,
  })
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Info of order. Can be a stringified JSON object',
    required: false,
    example: '{"name":"John Doe","age":30}',
  })
  orderInfo: string;

  @ApiProperty({
    description: 'Type of order',
    externalDocs: {
      description:
        'VNPAY documentation. https://sandbox.vnpayment.vn/apis/docs/loai-hang-hoa',
      url: 'https://sandbox.vnpayment.vn/apis/docs/loai-hang-hoa',
    },
    required: true,
    example: '100000',
  })
  @IsNotEmpty()
  orderType: string;

  @ApiProperty({
    description: 'ID of order. This must be unique across the system',
    required: true,
    example: 'ORDER123456',
  })
  @IsNotEmpty()
  orderId: string;
}

export class GetPaymentUrlResponseDTO extends PartialType(SuccessResponseDTO) {
  @ApiProperty()
  url: string;
}
