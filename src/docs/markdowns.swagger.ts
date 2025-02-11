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
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created markdown
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Markdown'
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the markdown
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Markdown'
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
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */