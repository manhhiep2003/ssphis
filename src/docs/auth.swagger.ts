/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng (logout)
 *     description: Vô hiệu hóa token và yêu cầu người dùng đăng nhập lại.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout thành công"
 *       400:
 *         description: Thiếu token hoặc định dạng token không hợp lệ
 *       401:
 *         description: Token đã bị vô hiệu hóa hoặc không hợp lệ
 */
