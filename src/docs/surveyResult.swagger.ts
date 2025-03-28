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
 * /api/survey-result/submit:
 *   post:
 *     summary: Submit answers for a survey result
 *     tags: [SurveyResult]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               surveyId:
 *                 type: integer
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                     optionId:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Survey result submitted successfully
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
 * /api/survey-result/user/{id}:
 *   get:
 *     summary: Retrieve surveys and results for a specific user
 *     description: Get all surveys that a user has participated in, along with their survey results and the questions/answers they selected.
 *     tags:
 *       - SurveyResult
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of surveys for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyResultId:
 *                     type: string
 *                     example: "1"
 *                   survey:
 *                     type: object
 *                     properties:
 *                       surveyId:
 *                         type: string
 *                         example: "1"
 *                       title:
 *                         type: string
 *                         example: "Depression Test"
 *                       description:
 *                         type: string
 *                         example: "A survey to assess depression levels"
 *                       categoryId:
 *                         type: string
 *                         example: "2"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       createdBy:
 *                         type: string
 *                         nullable: true
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       updatedBy:
 *                         type: string
 *                         nullable: true
 *                       questions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             questionId:
 *                               type: string
 *                               example: "101"
 *                             questionText:
 *                               type: string
 *                               example: "How often do you feel down?"
 *                             selectedOption:
 *                               type: object
 *                               nullable: true
 *                               properties:
 *                                 optionId:
 *                                   type: string
 *                                   example: "1001"
 *                                 value:
 *                                   type: integer
 *                                   example: 2
 *                                 optionText:
 *                                   type: string
 *                                   example: "Sometimes"
 *                   depressionScore:
 *                     type: number
 *                     example: 15
 *                   anxietyScore:
 *                     type: number
 *                     example: 10
 *                   stressScore:
 *                     type: number
 *                     example: 12
 *                   depressionLevel:
 *                     type: string
 *                     example: "Moderate"
 *                   anxietyLevel:
 *                     type: string
 *                     example: "Mild"
 *                   stressLevel:
 *                     type: string
 *                     example: "Moderate"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid input
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
