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
 *   name: Appointments
 *   description: API for managing appointments
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Retrieve an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the appointment to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointmentsByPychologist:
 *   get:
 *     summary: Retrieve appointments filtered by psychologist's time slots and optionally by student
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The psychologist's user ID to filter appointments by time slots
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter appointments by student's user ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Cancelled, Completed]
 *         required: false
 *         description: Filter appointments by status
 *       - in: query
 *         name: time_slot_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter appointments by specific time slot ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointments
 *       400:
 *         description: Bad request - user_id is required
 *       404:
 *         description: No appointments found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments-array:
 *   post:
 *     summary: Create multiple appointments
 *     tags: [Appointments]
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
 *               appointments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     time_slot_id:
 *                       type: integer
 *                     date:
 *                       type: string
 *                       format: date-time
 *     responses:
 *       201:
 *         description: Successfully created appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Cancelled, Completed]
 *               linkMeeting:
 *                 type: string
 *                 description: URL for the meeting
 *     responses:
 *       200:
 *         description: Successfully updated the appointment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the appointment to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the appointment
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointmentsByUser:
 *   get:
 *     summary: Retrieve appointments by user ID with optional filters
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID to retrieve appointments for
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Cancelled, Completed]
 *         required: false
 *         description: Filter appointments by status
 *       - in: query
 *         name: time_slot_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter appointments by specific time slot ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request - user_id is required
 *       404:
 *         description: No appointments found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         appointment_id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         time_slot_id:
 *           type: integer
 *         date:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [Pending, Approved, Cancelled, Completed]
 *         linkMeeting:
 *           type: string
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
 *         timeSlot:
 *           type: object
 *           properties:
 *             time_slot_id:
 *               type: integer
 *             start_time:
 *               type: string
 *             end_time:
 *               type: string
 *             status:
 *               type: string
 *               enum: [Available, Booked]
 */
