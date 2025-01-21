import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The username of the user
 *         required: true
 *         type: string
 *       - name: email
 *         in: body
 *         description: The email of the user
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         description: The password of the user
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/users", createUserHandler);

export default router;
