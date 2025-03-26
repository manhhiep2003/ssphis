/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@prisma/client";
import prisma from "../prisma";

export class CategoryService {
  static async createCategory(data: { name: string; description: string }): Promise<Category> {
    return prisma.category.create({ data });
  }

  static async getAllCategories() {
    const categories = await prisma.category.findMany();
    const serializedCategories = categories.map((category) => ({
      ...category,
      categoryId: category.categoryId.toString(),
    }));
    return serializedCategories;
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
