/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Program:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The program ID
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the program
 *           example: "Hỗ trợ mất ngủ"
 *         description:
 *           type: string
 *           description: The description of the program
 *           example: "Chương trình cải thiện giấc ngủ"
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the program
 *           example: "2025-02-20T08:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the program
 *           example: "2025-02-25T18:00:00Z"
 *         targetAudience:
 *           type: string
 *           description: The target audience for the program
 *           example: "Adults with sleep disorders"
 *         location:
 *           type: string
 *           description: The location of the program
 *           example: "Hà Nội, Việt Nam"
 *         organizerEmail:
 *           type: string
 *           format: email
 *           description: The email of the program organizer
 *           example: "organizer@example.com"
 *         contactPhone:
 *           type: string
 *           description: The contact phone number
 *           example: "+84 123 456 789"
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: The URL of the program image
 *           example: "https://example.com/image.jpg"
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the program
 *           example: 199.99
 *         rating:
 *           type: integer
 *           description: The rating of the program
 *           example: 5
 *         categoryId:
 *           type: integer
 *           description: The category ID associated with the program
 *           example: 2
 */

/**
 * @swagger
 * tags:
 *   name: Program
 *   description: API for managing programs
 */

/**
 * @swagger
 * /api/program:
 *   post:
 *     summary: Create a new program
 *     tags:
 *       - Program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the program
 *                 example: "Hỗ trợ mất ngủ"
 *               description:
 *                 type: string
 *                 description: Description of the program
 *                 example: "Chương trình cải thiện giấc ngủ"
 *               categoryId:
 *                 type: integer
 *                 description: The category ID
 *                 example: 2
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date and time of the program
 *                 example: "2023-12-01T09:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end date and time of the program
 *                 example: "2023-12-31T17:00:00Z"
 *               time:
 *                 type: string
 *                 description: Time
 *                 example: "19:00 - 21:00"
 *               frequency:
 *                 type: string
 *                 description: Frequency
 *                 example: "Chủ nhật hàng tuần"
 *               targetAudience:
 *                 type: string
 *                 description: The target audience for the program
 *                 example: "Người trưởng thành bị mất ngủ"
 *               location:
 *                 type: string
 *                 description: The location where the program will be held
 *                 example: "Hà Nội, Việt Nam"
 *               organizerEmail:
 *                 type: string
 *                 format: email
 *                 description: The email of the organizer
 *                 example: "organizer@example.com"
 *               contactPhone:
 *                 type: string
 *                 description: The contact phone number for the program
 *                 example: "+84123456789"
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the image for the program
 *                 example: "https://example.com/image.jpg"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the program
 *                 example: 99.99
 *               rating:
 *                 type: integer
 *                 description: The rating of the program
 *                 example: 5
 *               instructors:
 *                 type: array
 *                 description: List of instructors associated with the program
 *                 items:
 *                   type: object
 *                   properties:
 *                     instructorName:
 *                       type: string
 *                       description: Name of the instructor
 *                       example: "Nguyễn Văn A"
 *                     instructorImage:
 *                       type: string
 *                       description: Image URL of the instructor
 *                       example: "https://example.com/instructorA.jpg"
 *                     instructorTitle:
 *                       type: string
 *                       description: Title of the instructor
 *                       example: "Bác sĩ chuyên khoa"
 *                     instructorExperience:
 *                       type: string
 *                       description: Experience of the instructor
 *                       example: "10 năm kinh nghiệm trong lĩnh vực giấc ngủ"
 *                     instructorDescription:
 *                       type: string
 *                       description: Short description about the instructor
 *                       example: "Chuyên gia tư vấn giấc ngủ hàng đầu"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chương trình tạo thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     programId:
 *                       type: string
 *                       example: "1"
 *                     title:
 *                       type: string
 *                       example: "Hỗ trợ mất ngủ"
 *                     instructors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           instructorId:
 *                             type: string
 *                             example: "1"
 *                           instructorName:
 *                             type: string
 *                             example: "Nguyễn Văn A"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/program:
 *   get:
 *     summary: Retrieve all programs
 *     tags: [Program]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all programs
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/program/{id}:
 *   get:
 *     summary: Get a program by ID
 *     tags:
 *       - Program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The program ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Program details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /api/program/{id}:
 *   put:
 *     summary: Update a program by ID
 *     tags:
 *       - Program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the program
 *                 example: "Updated program title"
 *               description:
 *                 type: string
 *                 description: The updated description of the program
 *                 example: "Updated program description"
 *               categoryId:
 *                 type: integer
 *                 description: The updated category ID
 *                 example: 3
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated start date and time of the program
 *                 example: "2023-12-01T09:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The updated end date and time of the program
 *                 example: "2023-12-31T17:00:00Z"
 *               time:
 *                 type: string
 *                 description: Time
 *                 example: "19:00 - 21:00"
 *               frequency:
 *                 type: string
 *                 description: Frequency
 *                 example: "Chủ nhật hàng tuần"
 *               targetAudience:
 *                 type: string
 *                 description: The updated target audience for the program
 *                 example: "Người trưởng thành bị mất ngủ"
 *               location:
 *                 type: string
 *                 description: The updated location where the program will be held
 *                 example: "Hà Nội, Việt Nam"
 *               organizerEmail:
 *                 type: string
 *                 format: email
 *                 description: The updated email of the organizer
 *                 example: "updated_organizer@example.com"
 *               contactPhone:
 *                 type: string
 *                 description: The updated contact phone number for the program
 *                 example: "+84123456789"
 *               imageUrl:
 *                 type: string
 *                 description: The updated URL of the image for the program
 *                 example: "https://example.com/updated_image.jpg"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated price of the program
 *                 example: 99.99
 *               rating:
 *                 type: integer
 *                 description: The updated rating of the program
 *                 example: 5
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Program updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /api/program/{id}:
 *   delete:
 *     summary: Delete a program by ID
 *     tags:
 *       - Program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The program ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Program deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Program not found
 */
