import qs from "qs";
import crypto from "crypto";
import { vnpayConfig } from "../configs/vnpay.config";

export const buildVnpayUrl = (
  orderInfo: string,
  amount: number,
  orderId: string
) => {
  const { vnp_TmnCode, vnp_Url, vnp_ReturnUrl, vnp_HashSecret } = vnpayConfig;

  const date = new Date();
  const createDate = date
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);

  const params: Record<string, string | number> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Amount: amount * 100, // vnpay tính theo VND * 100
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl,
    vnp_IpAddr: "127.0.0.1", // nên lấy real IP từ request nếu production
    vnp_CreateDate: createDate,
  };

  const sortedParams = sortObject(params);
  const queryString = qs.stringify(sortedParams, { encode: false });

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const secureHash = hmac
    .update(Buffer.from(queryString, "utf-8"))
    .digest("hex");

  return `${vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;
};

type VnpayParams = Record<string, string | number>;

const sortObject = (obj: VnpayParams): VnpayParams => {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {} as VnpayParams);
};

export const verifyVnpayReturn = (query: Record<string, string>): boolean => {
  const vnp_SecureHash = query["vnp_SecureHash"];
  delete query["vnp_SecureHash"];
  delete query["vnp_SecureHashType"];

  const sortedParams = sortObject(query);
  const queryString = qs.stringify(sortedParams, { encode: false });

  const hmac = crypto.createHmac("sha512", vnpayConfig.vnp_HashSecret);
  const hash = hmac.update(Buffer.from(queryString, "utf-8")).digest("hex");

  return hash === vnp_SecureHash;
};
