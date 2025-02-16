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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Program created successfully
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
 *                 example: "Updated program title"
 *               description:
 *                 type: string
 *                 example: "Updated program description"
 *               categoryId:
 *                 type: integer
 *                 example: 3
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