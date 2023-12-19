import * as crypto from 'crypto';

export const getSecureHash = (signData: string, secretKey: string) => {
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  return signed;
};
