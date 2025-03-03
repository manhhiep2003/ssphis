/**
 * @swagger
 * /api/payment/create:
 *   post:
 *     summary: Tạo URL thanh toán VNPAY
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - description
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "ORDER123"
 *               amount:
 *                 type: number
 *                 example: 500000
 *               description:
 *                 type: string
 *                 example: "Thanh toan don hang ORDER123"
 *     responses:
 *       200:
 *         description: Trả về URL thanh toán của VNPAY
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                   example: "https://sandbox.vnpayment.vn/..."
 */

/**
 * @swagger
 * /api/payment/vnpay-return:
 *   get:
 *     summary: Xử lý callback từ VNPAY sau khi thanh toán
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: vnp_TxnRef
 *         required: true
 *         schema:
 *           type: string
 *           example: "ORDER123"
 *       - in: query
 *         name: vnp_ResponseCode
 *         required: true
 *         schema:
 *           type: string
 *           example: "00"
 *       - in: query
 *         name: vnp_SecureHash
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123456"
 *       - in: query
 *         name: [Các tham số khác của VNPAY]
 *     responses:
 *       200:
 *         description: Kết quả thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment successful"
 *                 data:
 *                   type: object
 *       400:
 *         description: Thanh toán thất bại hoặc checksum không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
