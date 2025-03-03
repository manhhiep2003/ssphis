/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import {
  createUser,
  getUserByIdService,
  getUsersByRoleService,
  getUserService,
  loginUser,
  updateUserProfile,
  updateUserStatusById,
} from "../services/user.service";
import HTTP_STATUS from "../constants/httpStatus";
import { USERS_MESSAGES } from "../constants/messages";

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

export async function getAllUsersHandler(req: Request, res: Response): Promise<void> {
  try {
    const users = await getUserService();

    const usersWithoutBigInt = users.map((user) => ({
      ...user,
      id: user.id.toString(),
    }));

    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RETRIEVE_SUCCESS,
      data: usersWithoutBigInt,
    });
  } catch (error: any) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: USERS_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

export async function getUsersByRoleHandler(req: Request, res: Response): Promise<void> {
  try {
    const { roleCode } = req.params;

    if (!roleCode) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: USERS_MESSAGES.ROLE_CODE_REQUIRED,
      });
      return;
    }

    const users = await getUsersByRoleService(roleCode);

    const usersWithoutBigInt = users.map((user) => ({
      ...user,
      id: user.id.toString(),
    }));

    if (users.length === 0) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.NO_USERS_FOUND,
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RETRIEVE_SUCCESS,
      data: usersWithoutBigInt,
    });
  } catch (error: any) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: USERS_MESSAGES.RETRIEVE_FAILURE,
      error: error.message,
    });
  }
}

export async function updateUserProfileHandler(req: Request, res: Response): Promise<void> {
  try {
    const { userCode } = req.params;
    const { firstName, lastName, phone, gender, image, email, description, updatedBy } = req.body;

    const updatedUser = await updateUserProfile(userCode, {
      firstName,
      lastName,
      phone,
      gender,
      image,
      email,
      description,
      updatedBy,
    });

    const userWithoutBigInt = {
      ...updatedUser,
      id: updatedUser.id.toString(),
    };

    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UPDATE_SUCCESS,
      user: userWithoutBigInt,
    });
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("User not found")) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: error.message });
    } else if (error.message.includes("Email already exists")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: USERS_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }
}

export async function getUserByIdHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid user ID format",
      });
      return;
    }

    const user = await getUserByIdService(id);

    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
      data: user,
    });
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.NOT_FOUND,
      });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: USERS_MESSAGES.RETRIEVE_SINGLE_FAILURE,
        error: error.message,
      });
    }
  }
}

export async function updateUserStatusHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(id)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid user ID format",
      });
      return;
    }

    if (typeof status !== "boolean") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Status must be a boolean value",
      });
      return;
    }

    const result = await updateUserStatusById(id, status);

    res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UPDATE_SUCCESS,
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    if (error.message === "User not found") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: USERS_MESSAGES.NOT_FOUND,
      });
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: USERS_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }
}
