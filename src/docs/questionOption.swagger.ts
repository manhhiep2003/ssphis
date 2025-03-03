/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     QuestionOption:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The question option ID
 *           example: 1
 *         optionText:
 *           type: string
 *           description: Option text
 *           example: "Có"
 *         value:
 *           type: integer
 *           description: The value of the option
 *           example: 1
 *         questionId:
 *           type: integer
 *           description: The question ID associated with the option
 *           example: 2
 */

/**
 * @swagger
 * tags:
 *   name: QuestionOption
 *   description: API for managing question options
 */

/**
 * @swagger
 * /api/question-option:
 *   post:
 *     summary: Create a new question option
 *     tags:
 *       - QuestionOption
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optionText:
 *                 type: string
 *                 description: Option text
 *                 example: "Có"
 *               value:
 *                 type: integer
 *                 description: The value of the question option ID
 *                 example: 1
 *               questionId:
 *                 type: integer
 *                 description: The question ID
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question option created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/question-option:
 *   get:
 *     summary: Retrieve all question options
 *     tags: [QuestionOption]
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
 * /api/question-option/{id}:
 *   get:
 *     summary: Get a question option by ID
 *     tags:
 *       - QuestionOption
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question option ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question option details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question option not found
 */

/**
 * @swagger
 * /api/question-option/{id}:
 *   put:
 *     summary: Update a question option by ID
 *     tags:
 *       - QuestionOption
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The question option ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optionText:
 *                 type: string
 *                 example: "Có"
 *               value:
 *                 type: integer
 *                 example: 1
 *               questionId:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question option updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question option not found
 */

/**
 * @swagger
 * /api/question-option/{id}:
 *   delete:
 *     summary: Delete a question option by ID
 *     tags:
 *       - QuestionOption
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The question option ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Question option deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Question option not found
 */
