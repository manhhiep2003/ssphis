/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The question ID
 *           example: 1
 *         questionText:
 *           type: string
 *           description: Question text
 *           example: "Bạn có gặp khó ngủ?"
 *         surveyId:
 *           type: integer
 *           description: The survey ID associated with the question
 *           example: 2
 */

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: API for managing questions
 */

/**
 * @swagger
 * /api/question:
 *   post:
 *     summary: Create a new question
 *     tags:
 *       - Question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *                 description: Question text
 *                 example: "Bạn có gặp khó ngủ?"
 *               surveyId:
 *                 type: integer
 *                 description: The survey ID
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/question:
 *   get:
 *     summary: Retrieve all questions
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all questions
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/question/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /api/question/{id}:
 *   put:
 *     summary: Update a question by ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText:
 *                 type: string
 *                 example: "Bạn có gặp khó ngủ?"
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /api/question/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags:
 *       - Question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The question ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question not found
 */
