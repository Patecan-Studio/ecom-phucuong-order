import { Inject, Injectable, Logger } from '@nestjs/common';
import * as qs from 'querystring';
import * as dateformat from 'dateformat';
import { GetPaymentUrlDTO } from './dtos/get-payment-url.dto';
import { PaymentModuleConfig, PaymentServiceConfig } from '../interfaces';
import { sortObject } from '../utils/sort-object';
import { getSecureHash } from '../utils/get-secure-hash';
import {
  PAYMENT_MODULE_CONFIG,
  VNPAY_IPN_RESPONSE_CODES,
  VNPAY_TRANSACTION_STATUS,
} from '../constants';
import { GetPaymentResultRedirectUrlDTO } from './dtos/get-payment-result-redirect-url.dto';
import { convertUTCToGMT7 } from '../utils/convert-to-local-time';
import { UpdateOrderPaymentResult } from './dtos/update-order-payment.dtos';
import { OrderRepository } from '../database/order.repository';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly config: PaymentServiceConfig;
  constructor(
    @Inject(PAYMENT_MODULE_CONFIG)
    moduleConfig: PaymentModuleConfig,
    private readonly orderRepo: OrderRepository,
  ) {
    this.config = moduleConfig.serviceConfig;
  }

  getPaymentUrl(dto: GetPaymentUrlDTO) {
    const { amount, ipAddress, orderInfo, orderType, orderId: tnxId } = dto;
    const {
      apiUrl,
      apiVersion,
      merchantCode,
      paymentReturnUrl,
      durationInSecond,
      hashSecret,
    } = this.config;

    const now = new Date();
    const createdDate = convertUTCToGMT7(now);
    const expiredDate = convertUTCToGMT7(
      new Date(now.getTime() + durationInSecond * 1000),
    );

    let params = {
      vnp_Version: apiVersion,
      vnp_Command: 'pay',
      vnp_TmnCode: merchantCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: tnxId,
      vnp_OrderInfo: encodeURI(orderInfo),
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: encodeURI(paymentReturnUrl),
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: dateformat(createdDate, 'yyyymmddHHMMss'),
      vnp_ExpireDate: dateformat(expiredDate, 'yyyymmddHHMMss'),
    } as any;

    const url = new URL(apiUrl);

    params = sortObject(params);
    const signData = qs.stringify(params);
    const signed = getSecureHash(signData, hashSecret);
    params['vnp_SecureHash'] = signed;

    url.search = qs.stringify(params);

    this.logger.log('VNPAY payment URL: ' + url.toString());

    return url.toString();
  }

  verifyAndGetRedirectUrl(dto: GetPaymentResultRedirectUrlDTO) {
    const { paymentResultRedirectUrl } = this.config;
    const isHashValid = this.verifySignature(dto);
    const url = new URL(paymentResultRedirectUrl);
    const orderId = dto.vnp_TxnRef.toString();
    let status;
    if (!isHashValid) {
      this.logger.log('Invalid signature');
      status = 'failed';
    } else {
      this.logger.log('Transaction response code: ' + dto.vnp_ResponseCode);
      status =
        dto.vnp_ResponseCode === VNPAY_TRANSACTION_STATUS.SUCCESS
          ? 'success'
          : 'failed';
    }

    url.searchParams.append('orderId', orderId);
    url.searchParams.append('status', status);
    this.logger.log('VNPAY redirect result URL: ' + url.toString());

    return url.toString();
  }

  async updateOrderPayment(
    dto: GetPaymentResultRedirectUrlDTO,
  ): Promise<UpdateOrderPaymentResult> {
    try {
      if (!this.verifySignature(dto)) {
        return VNPAY_IPN_RESPONSE_CODES.INVALID_SIGNATURE;
      }

      // get order from database
      const order = await this.orderRepo.getById(dto.vnp_TxnRef.toString());

      if (!order) {
        return VNPAY_IPN_RESPONSE_CODES.ORDER_NOT_FOUND;
      }

      if (order.amount !== dto.vnp_Amount / 100) {
        return VNPAY_IPN_RESPONSE_CODES.INVALID_AMOUNT;
      }

      if (order.status !== 'PENDING') {
        return VNPAY_IPN_RESPONSE_CODES.ORDER_ALREADY_CONFIRMED;
      }

      const { vnp_ResponseCode, vnp_TransactionStatus } = dto;
      if (
        vnp_ResponseCode === VNPAY_TRANSACTION_STATUS.SUCCESS ||
        vnp_TransactionStatus === VNPAY_TRANSACTION_STATUS.SUCCESS
      ) {
        // payment is success -> update order status to CONFIRMED
        order.status = 'CONFIRMED';
      } else {
        // payment is failed -> update order status to FAILED
        order.status = 'PAYMENT_FAILED';
      }

      const { vnp_SecureHash, ...paymentInfo } = dto;
      order.paymentInfo = paymentInfo;

      await this.orderRepo.save(order);

      return VNPAY_IPN_RESPONSE_CODES.CONFIRMED_SUCCESSFULLY;
    } catch (error) {
      this.logger.error(error);
      return VNPAY_IPN_RESPONSE_CODES.UNKNOWN_ERROR;
    }
  }

  private verifySignature(dto: GetPaymentResultRedirectUrlDTO) {
    const {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
    } = dto;

    const params = {
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TmnCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
    };

    const sortedParams = sortObject(params);
    const signData = qs.stringify(sortedParams);
    const signed = getSecureHash(signData, this.config.hashSecret);

    return signed === vnp_SecureHash;
  }
}
