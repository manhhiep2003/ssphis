/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../prisma";

export class RoleService {
  static async getAllRoles() {
    const roles = await prisma.role.findMany();
    return roles.map((role) => ({
      ...role,
      id: role.id.toString(), // Convert BigInt to string
    }));
  }

  static async getRoleById(id: number) {
    const role = await prisma.role.findUnique({ where: { id } });
    if (role) {
      return {
        ...role,
        id: role.id.toString(), // Convert BigInt to string
      };
    }
    return null;
  }

  static async createRole(data: any) {
    console.log("Received data for creating role:", data);
    if (!data.roleCode || !data.roleName || !data.createdBy) {
      throw new Error("roleCode, roleName, and createdBy are required");
    }
    const role = await prisma.role.create({
      data: {
        roleCode: data.roleCode,
        roleName: data.roleName,
        createdBy: data.createdBy,
      },
    });
    return {
      ...role,
      id: role.id.toString(), // Convert BigInt to string
    };
  }

  static async updateRole(id: number, data: any) {
    const role = await prisma.role.update({ where: { id }, data });
    return {
      ...role,
      id: role.id.toString(), // Convert BigInt to string
    };
  }

  static async deleteRole(id: number) {
    const role = await prisma.role.delete({ where: { id } });
    return {
      ...role,
      id: role.id.toString(), // Convert BigInt to string
    };
  }
}
