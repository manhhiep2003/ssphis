import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.service";

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
    const { user, token } = await createUser(
      username,
      email,
      password,
      phone,
      gender,
      createdBy
    );

    const userWithoutBigInt = {
      ...user,
      id: user.id.toString(),
    };

    res.status(201).json({
      message: "User created successfully.",
      user: userWithoutBigInt,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user." });
  }
}

export async function loginUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { email: username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  try {
    const { user, token } = await loginUser(username, password);

    const userWithoutBigInt = {
      ...user,
      id: user.id.toString(),
    };

    res.status(200).json({
      message: "Login successful",
      user: userWithoutBigInt,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid username or password" });
  }
}
