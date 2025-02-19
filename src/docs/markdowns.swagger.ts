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
 *   name: Markdowns
 *   description: API for managing markdowns
 */

/**
 * @swagger
 * /api/markdowns:
 *   get:
 *     summary: Retrieve all markdowns
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all markdowns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Markdown'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/markdowns/{id}:
 *   get:
 *     summary: Retrieve a markdown by ID
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the markdown to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the markdown
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Markdown'
 *       404:
 *         description: Markdown not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/markdowns:
 *   post:
 *     summary: Create a new markdown
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contentHtml
 *               - contentMarkdown
 *               - title
 *               - description
 *               - user_id
 *               - category_id
 *               - imgageUrl
 *             properties:
 *               contentHtml:
 *                 type: string
 *                 description: HTML content of the markdown
 *               contentMarkdown:
 *                 type: string
 *                 description: Raw markdown content
 *               imgageUrl:
 *                 type: string
 *                 description: URL of the associated image
 *               title:
 *                 type: string
 *                 description: Title of the markdown
 *               hashtag:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of hashtags
 *               description:
 *                 type: string
 *                 description: Description of the markdown
 *               user_id:
 *                 type: integer
 *                 description: ID of the user creating the markdown
 *               category_id:
 *                 type: integer
 *                 description: ID of the associated category
 *     responses:
 *       201:
 *         description: Successfully created markdown
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Markdown'
 *       400:
 *         description: Bad request - Missing or invalid fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/markdowns/user/{user_id}:
 *   get:
 *     summary: Retrieve markdowns by user ID
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve markdowns for
 *     responses:
 *       200:
 *         description: Successfully retrieved markdowns
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Markdown'
 *       400:
 *         description: Bad request - Invalid user_id format
 *       404:
 *         description: No markdowns found for this user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/markdowns/{id}:
 *   put:
 *     summary: Update a markdown
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the markdown to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentHtml:
 *                 type: string
 *               contentMarkdown:
 *                 type: string
 *               imgageUrl:
 *                 type: string
 *               title:
 *                 type: string
 *               hashtag:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the markdown
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Markdown'
 *       400:
 *         description: Bad request - Invalid fields
 *       404:
 *         description: Markdown not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/markdowns/{id}:
 *   delete:
 *     summary: Delete a markdown
 *     tags: [Markdowns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the markdown to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the markdown
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Markdown:
 *       type: object
 *       required:
 *         - contentHtml
 *         - contentMarkdown
 *         - title
 *         - description
 *         - user_id
 *         - category_id
 *         - imgageUrl
 *       properties:
 *         id:
 *           type: integer
 *         contentHtml:
 *           type: string
 *         contentMarkdown:
 *           type: string
 *         imgageUrl:
 *           type: string
 *         title:
 *           type: string
 *         hashtag:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *         user_id:
 *           type: integer
 *         category_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
