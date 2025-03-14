/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       userCode:
 *                         type: string
 *                         example: "1234567890"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         example: "1234567890"
 *                       gender:
 *                         type: string
 *                         example: "male"
 *                       role:
 *                         type: object
 *                         properties:
 *                           roleCode:
 *                             type: string
 *                             example: "ADM"
 *                           roleName:
 *                             type: string
 *                             example: "Admin"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{roleCode}:
 *   get:
 *     summary: Get users by role code
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Role code to filter users
 *         example: ADM
 *     responses:
 *       200:
 *         description: List of users with specified role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       userCode:
 *                         type: string
 *                         example: "1234567890"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         example: "1234567890"
 *                       gender:
 *                         type: string
 *                         example: "male"
 *                       role:
 *                         type: object
 *                         properties:
 *                           roleCode:
 *                             type: string
 *                             example: "ADM"
 *                           roleName:
 *                             type: string
 *                             example: "Admin"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: No users found for the specified role
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/profile/{userCode}:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userCode
 *         required: true
 *         schema:
 *           type: string
 *         description: User code of the profile to update
 *         example: "USER123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               image:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               description:
 *                 type: string
 *                 example: "#MarkDown description"
 *               updatedBy:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     userCode:
 *                       type: string
 *                       example: "USER123"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     gender:
 *                       type: string
 *                       example: "male"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *       400:
 *         description: Bad request - Email already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/public/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     userCode:
 *                       type: string
 *                       example: "1234567890"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     phone:
 *                       type: string
 *                       example: "1234567890"
 *                     gender:
 *                       type: string
 *                       example: "male"
 *                     role:
 *                       type: object
 *                       properties:
 *                         roleCode:
 *                           type: string
 *                           example: "ADM"
 *                         roleName:
 *                           type: string
 *                           example: "Admin"
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user status (active/inactive)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID to update status for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       400:
 *         description: Invalid user ID format or invalid status value
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
