/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The category ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the category
 *           example: "Khảo sát lo âu"
 *         description:
 *           type: string
 *           description: Description of the category
 *           example: "Danh mục chứa các khảo sát về lo âu"
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API for managing category
 */


/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Khảo sát lo âu"
 *               description:
 *                 type: string
 *                 description: Description of the category
 *                 example: "Danh mục chứa các khảo sát về lo âu"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The category ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the category
 *                   example: "Khảo sát lo âu"
 *                 description:
 *                   type: string
 *                   description: Description of the category
 *                   example: "Danh mục chứa các khảo sát về lo âu"
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Khảo sát lo âu"
 *               description:
 *                 type: string
 *                 example: "Danh mục chứa các khảo sát về lo âu"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role category successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */