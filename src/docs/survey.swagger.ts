/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Survey:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The survey ID
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the survey
 *           example: "Survey about anxiety"
 *         description:
 *           type: string
 *           description: The description of the survey
 *           example: "A survey to assess anxiety levels"
 *         categoryId:
 *           type: integer
 *           description: The category ID associated with the survey
 *           example: 2
 */

/**
 * @swagger
 * tags:
 *   name: Survey
 *   description: API for managing surveys
 */

/**
 * @swagger
 * /api/survey:
 *   post:
 *     summary: Create a new survey
 *     tags:
 *       - Survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the survey
 *                 example: "Khảo sát lo âu (GAD-7)"
 *               description:
 *                 type: string
 *                 description: Description of the survey
 *                 example: "Đánh giá mức độ lo âu"
 *               categoryId:
 *                 type: integer
 *                 description: The category ID
 *                 example: 2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Survey created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/survey:
 *   get:
 *     summary: Retrieve all surveys
 *     tags: [Survey]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all surveys
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/survey/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags:
 *       - Survey
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The survey ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey not found
 */

/**
 * @swagger
 * /api/survey/{id}:
 *   put:
 *     summary: Update a survey by ID
 *     tags:
 *       - Survey
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The survey ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated survey title"
 *               description:
 *                 type: string
 *                 example: "Updated survey description"
 *               categoryId:
 *                 type: integer
 *                 example: 3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey not found
 */

/**
 * @swagger
 * /api/survey/{id}:
 *   delete:
 *     summary: Delete a survey by ID
 *     tags:
 *       - Survey
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The survey ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey not found
 */