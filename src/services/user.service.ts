import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(
  username: string,
  email: string,
  password: string,
  phone: string,
  gender: string,
  createdBy: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      createdBy,
    },
  });

  const token = jwt.sign(
    { id: Number(user.id), email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { user, token };
}

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: Number(user.id), username: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}
