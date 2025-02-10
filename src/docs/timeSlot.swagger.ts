/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: TimeSlots
 *   description: API for managing time slots
 */

/**
 * @swagger
 * /api/timeSlot:
 *   get:
 *     summary: Retrieve all time slots
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/timeSlot/{id}:
 *   get:
 *     summary: Retrieve a time slot by ID
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the time slot to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the time slot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       404:
 *         description: Time slot not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/timeSlotByUser:
 *   get:
 *     summary: Retrieve all time slots by user ID
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve time slots for
 *     responses:
 *       200:
 *         description: Successfully retrieved the time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       404:
 *         description: Time slots not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/timeSlot-array:
 *   post:
 *     summary: Create multiple time slots
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start_time:
 *                       type: string
 *                     end_time:
 *                       type: string
 *     responses:
 *       201:
 *         description: Successfully created time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/timeSlot/{id}:
 *   put:
 *     summary: Update a time slot
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the time slot to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Available, Booked]
 *     responses:
 *       200:
 *         description: Successfully updated the time slot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/timeSlot/{id}:
 *   delete:
 *     summary: Delete a time slot
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the time slot to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the time slot
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TimeSlot:
 *       type: object
 *       properties:
 *         time_slot_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         start_time:
 *           type: string
 *         end_time:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Available, Booked]
 *         created_at:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 */
