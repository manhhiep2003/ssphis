/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
  static async createCategory(data: {
    name: string;
    description: string;
  }): Promise<Category> {
    return prisma.category.create({ data });
  }

  static async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  static async getCategoryById(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { categoryId },
    });
    if (category) {
      return {
        ...category,
        categoryId: category.categoryId.toString(),
      };
    }
    return null;
  }

  static async updateCategory(categoryId: number, data: any) {
    const category = await prisma.category.update({
      where: { categoryId },
      data,
    });
    return {
      ...category,
      categoryId: category.categoryId.toString(),
    };
  }

  static async deleteCategory(categoryId: number) {
    const category = await prisma.category.delete({
      where: { categoryId },
    });
    return {
      ...category,
      categoryId: category.categoryId.toString(),
    };
  }
}
