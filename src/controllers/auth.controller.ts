/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { invalidateToken } from "../services/tokenService";
import HTTP_STATUS from "../constants/httpStatus";
import { USERS_MESSAGES } from "../constants/messages";
import { createUser, loginUser } from "../services/auth.service";

export async function createUserHandler(req: Request, res: Response): Promise<void> {
  const {
    username,
    email,
    password,
    userCode,
    firstName,
    lastName,
    phone,
    gender,
    createdBy,
    roleCode,
  } = req.body;

  if (!username || !email || !password || !phone || !roleCode) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: USERS_MESSAGES.MISSING_FIELDS });
    return;
  }

  try {
    const { user } = await createUser(
      username,
      email,
      password,
      userCode,
      firstName,
      lastName,
      phone,
      gender,
      roleCode,
      createdBy,
    );

    const userWithoutBigInt = {
      ...user,
      id: user.id.toString(),
    };

    res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.CREATE_SUCCESS,
      user: userWithoutBigInt,
    });
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("Role with code")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    } else if (error.message.includes("Username")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    } else {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: USERS_MESSAGES.CREATE_FAILURE });
    }
  }
}

export async function loginUserHandler(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: USERS_MESSAGES.MISSING_CREDENTIALS });
    return;
  }

  try {
    const { user, token } = await loginUser(username, password);

    const userWithoutBigInt = {
      ...user,
      id: user.id.toString(),
    };

    res.status(HTTP_STATUS.OK).json({
      token,
      message: USERS_MESSAGES.LOGIN_SUCCESS,
      user: userWithoutBigInt,
    });
  } catch (error: any) {
    console.error(error);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: USERS_MESSAGES.LOGIN_FAILURE });
  }
}

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
