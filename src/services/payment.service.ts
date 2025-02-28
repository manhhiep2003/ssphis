import { buildVnpayUrl } from "../utils/vnpay";

export const createPaymentUrl = (
  orderId: string,
  amount: number,
  description: string
) => {
  return buildVnpayUrl(description, amount, orderId);
};
