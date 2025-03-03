import { Router } from "express";
import { createPayment, handleVnpayReturn } from "../controllers/payment.controller";

const router = Router();

router.post("/payment/create", createPayment);
router.get("/payment/vnpay-return", handleVnpayReturn);

export default router;
