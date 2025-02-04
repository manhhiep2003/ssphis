/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { JWT_MESSAGES } from "../constants/messages";

dotenv.config();

interface Payload {
  [key: string]: any;
}

const createToken = (payload: Payload): string | null => {
  const key = process.env.JWT_SECRET as string;
  let token: string | null = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const secretKey = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
  user?: any;
}

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"] as string | undefined;

  if (!authHeader) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: JWT_MESSAGES.NO_TOKEN_PROVIDED });
    return;
  }

  const token = authHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"

  if (!token) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: JWT_MESSAGES.INVALID_TOKEN_FORMAT });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: JWT_MESSAGES.FAILED_TO_AUTHENTICATE_TOKEN });
      return;
    }

    // Optionally, you can attach the decoded token to the request object
    req.user = decoded;

    next();
  });
};

export { createToken, verifyToken };
