export const PAYMENT_MODULE_CONFIG = 'PAYMENT.CONFIG';
export const PAYMENT_SERVICE_CONFIG = 'PAYMENT.SERVICE.CONFIG';

export const VNPAY_IPN_RESPONSE_CODES = {
  INVALID_SIGNATURE: {
    code: '97',
    message: 'Invalid signature',
  },
  ORDER_NOT_FOUND: {
    code: '01',
    message: 'Order not found',
  },
  INVALID_AMOUNT: {
    code: '04',
    message: 'Invalid amount',
  },
  ORDER_ALREADY_CONFIRMED: {
    code: '02',
    message: 'Order already confirmed',
  },
  CONFIRMED_SUCCESSFULLY: {
    code: '00',
    message: 'Confirmed Success',
  },
  UNKNOWN_ERROR: {
    code: '99',
    message: 'Unknown error',
  },
};

export const VNPAY_TRANSACTION_STATUS = {
  SUCCESS: '00',
};
