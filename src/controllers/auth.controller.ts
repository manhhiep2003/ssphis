import { Request, Response } from "express";
import { invalidateToken } from "../services/tokenService";

export async function logoutController(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(400).json({ message: "Missing token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(400).json({ message: "Invalid token format" });
    return;
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "3600"; // Mặc định 1h
  await invalidateToken(token, expiresIn);

  res.status(200).json({ message: "Logout thành công" });
}
