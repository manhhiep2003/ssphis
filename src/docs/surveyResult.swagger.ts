/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     SurveyResult:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The survey result ID
 *           example: 1
 *         userId:
 *           type: integer
 *           description: The user ID associated with the survey result
 *           example: 1
 *         surveyId:
 *           type: integer
 *           description: The survey ID associated with the survey result
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *   name: SurveyResult
 *   description: API for managing survey results
 */

/**
 * @swagger
 * /api/survey-result:
 *   post:
 *     summary: Create a new survey result
 *     tags:
 *       - SurveyResult
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The user ID associated with the survey result
 *                 example: 1
 *               surveyId:
 *                 type: integer
 *                 description: The survey ID associated with the survey result
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Survey result created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/survey-result:
 *   get:
 *     summary: Retrieve all survey results
 *     tags: [SurveyResult]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all survey results
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/survey-result/{id}:
 *   get:
 *     summary: Get a survey result by ID
 *     tags:
 *       - SurveyResult
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The survey result ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey result details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey result not found
 */

/**
 * @swagger
 * /api/survey-result/{id}:
 *   put:
 *     summary: Update a survey result by ID
 *     tags:
 *       - SurveyResult
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The survey result ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               surveyId:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey result updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey result not found
 */

/**
 * @swagger
 * /api/survey-result/{id}:
 *   delete:
 *     summary: Delete a survey result by ID
 *     tags:
 *       - SurveyResult
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The survey result ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Survey result deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Survey result not found
 */
