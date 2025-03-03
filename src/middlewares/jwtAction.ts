/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { JWT_MESSAGES } from "../constants/messages";
import { isTokenInvalidated } from "../services/tokenService";

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

const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: JWT_MESSAGES.NO_TOKEN_PROVIDED,
    });
    return; // Stop further execution
  }

  const token = authHeader.split(" ")[1];

  if (await isTokenInvalidated(token)) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Token đã bị vô hiệu hóa, vui lòng đăng nhập lại",
    });
    return; // Stop further execution
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: JWT_MESSAGES.FAILED_TO_AUTHENTICATE_TOKEN,
      });
      return; // Stop further execution
    }

    req.user = decoded; // Attach the decoded user to the request object
    next(); // Pass control to the next middleware or route handler
  });
};

export { createToken, verifyToken };
