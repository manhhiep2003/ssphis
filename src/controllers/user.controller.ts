import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export async function createUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { username, email, password, phone, gender, createdBy } = req.body;

  if (!username || !email || !password || !phone) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    await createUser(username, email, password, phone, gender, createdBy);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
}
