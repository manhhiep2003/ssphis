/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "../prisma";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { createToken } from "../middlewares/jwtAction";

dotenv.config();

export async function createUser(
  username: string,
  email: string,
  password: string,
  userCode: string,
  firstName: string,
  lastName: string,
  phone: string,
  gender: string,
  roleCode: string,
  createdBy: string,
) {
  // Kiểm tra xem roleCode có tồn tại không
  const role = await prisma.role.findUnique({
    where: { roleCode: roleCode },
  });

  if (!role) {
    throw new Error(`Role with code ${roleCode} does not exist`);
  }

  // Kiểm tra xem username đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    throw new Error(`Username ${username} already exists`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      userCode,
      firstName,
      lastName,
      phone,
      gender,
      roleCode,
      createdBy,
    },
  });

  // Loại bỏ mật khẩu khỏi phản hồi
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
}

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  console.log(username, password);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }
  const payload = {
    ...user,
    id: user.id.toString(), // Assuming user.id is a BigInt
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const token = createToken(payload);

  // Loại bỏ mật khẩu khỏi phản hồi
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
}

export async function getUserService() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  return users.map((user) => ({
    ...user,
    role: user.roleCode.toString(), // Convert BigInt to string if needed
    user_id: user.id.toString(),
  }));
}

export async function getUsersByRoleService(roleCode: string) {
  const users = await prisma.user.findMany({
    where: {
      roleCode: roleCode,
    },
    include: {
      role: true,
    },
  });
  return users.map((user) => ({
    ...user,
    role: user.roleCode.toString(), // Convert BigInt to string if needed
    user_id: user.id.toString(),
  }));
}

export async function updateUserProfile(
  userCode: string,
  updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    image?: string;
    email?: string;
    description?: string;
    updatedBy?: string;
  },
) {
  const existingUser = await prisma.user.findUnique({
    where: { userCode: userCode },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Check if email is being updated and is not already taken
  if (updateData.email && updateData.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: updateData.email },
    });
    if (emailExists) {
      throw new Error("Email already exists");
    }
  }

  const updatedUser = await prisma.user.update({
    where: { userCode: userCode },
    data: {
      ...updateData,
      updatedAt: new Date(),
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
}

export async function getUserByIdService(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: BigInt(id) },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // const { password: _, ...userWithoutPassword } = user;

  return {
    id: user.id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    userCode: user.userCode,
    image: user.image,
    description: user.description,
    status: user.status,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    role: user.roleCode,
  };
}

export async function updateUserStatusById(id: number, status: boolean) {
  const existingUser = await prisma.user.findUnique({
    where: { id: BigInt(id) },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: BigInt(id) },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  return {
    id: updatedUser.id.toString(),
    status: updatedUser.status,
  };
}
