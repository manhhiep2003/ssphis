import { buildVnpayUrl } from "../utils/vnpay.util";

export const createPaymentUrl = (orderId: string, amount: number, description: string) => {
  return buildVnpayUrl(description, amount, orderId);
};
