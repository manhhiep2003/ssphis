import prisma from "../prisma";
import bcrypt from "bcrypt";

export async function createUser(
  username: string,
  email: string,
  password: string,
  phone: string,
  gender: string,
  createdBy: string,
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

  return user;
}
