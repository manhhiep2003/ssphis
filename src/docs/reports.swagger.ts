/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         report_id:
 *           type: integer
 *           description: The report ID
 *         appointment_id:
 *           type: integer
 *           description: The appointment ID associated with this report
 *         user_id:
 *           type: string
 *           description: The user ID who received the consultation
 *         health_level:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: The assessed health level
 *         health_status:
 *           type: string
 *           description: The detailed health status description
 *         feedback:
 *           type: string
 *           description: Feedback from the psychologist
 *         recommendations:
 *           type: string
 *           description: Recommended actions or treatments
 *         createdAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: string
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         updatedBy:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API for managing consultation reports
 */

/**
 * @swagger
 * /api/reports/appointment/{id}:
 *   post:
 *     summary: Create a report for an appointment
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - health_level
 *             properties:
 *               health_level:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: The assessed health level
 *               health_status:
 *                 type: string
 *                 description: Detailed description of health status
 *               feedback:
 *                 type: string
 *                 description: Feedback from psychologist
 *               recommendations:
 *                 type: string
 *                 description: Recommended actions or treatments
 *     responses:
 *       201:
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       400:
 *         description: Bad request - Invalid input or appointment not completed
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized to create reports
 *       404:
 *         description: Appointment not found
 *       409:
 *         description: Report already exists for this appointment
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reports retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by appointment ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: The report ID (optional)
 *       - in: query
 *         name: appointment_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Report retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */
