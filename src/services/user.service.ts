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
  createdBy: string
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
