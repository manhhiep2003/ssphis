/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "../prisma";

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
