import { Request, Response } from "express";
import { createPaymentUrl } from "../services/payment.service";
import { verifyVnpayReturn } from "../utils/vnpay.util";

export const createPayment = (req: Request, res: Response): void => {
  const { orderId, amount, description } = req.body;
  const paymentUrl = createPaymentUrl(orderId, amount, description);
  res.json({ paymentUrl });
};

export const handleVnpayReturn = (req: Request, res: Response): void => {
  const valid = verifyVnpayReturn(req.query as Record<string, string>);

  if (!valid) {
    res.status(400).json({ message: "Invalid checksum" });
    return;
  }

  const status = req.query["vnp_ResponseCode"];
  if (status === "00") {
    // Payment success
    res.json({ message: "Payment successful", data: req.query });
    return;
  }

  res.status(400).json({ message: "Payment failed", data: req.query });
};
