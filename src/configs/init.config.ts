import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function initializeApp() {
  const roleCodeAdmin = "ADMIN";

  const existingAdminRole = await prisma.role.findUnique({
    where: { roleCode: roleCodeAdmin },
  });

  if (!existingAdminRole) {
    await prisma.role.create({
      data: {
        roleCode: roleCodeAdmin,
        roleName: "Administrator",
        createdBy: "system",
      },
    });
  }

  const existingAdminUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdminUser) {
    const hashedPassword = await hash("Admin@123", 10);
    await prisma.user.create({
      data: {
        userCode: "ADMIN-USER-001",
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        roleCode: roleCodeAdmin,
        status: true,
        createdBy: "system",
      },
    });
    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
}
