/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export class MarkdownService {
  static async getAllMarkdowns() {
    const markdowns = await prisma.markdown.findMany();
    return markdowns.map((markdown) => ({
      ...markdown,
      id: markdown.id.toString(),
      user_id: markdown.user_id.toString(),
    }));
  }

  static async getMarkdownById(id: number) {
    const markdown = await prisma.markdown.findUnique({ where: { id } });
    if (markdown) {
      return {
        ...markdown,
        id: markdown.id.toString(),
        user_id: markdown.user_id.toString(),
      };
    }
    return null;
  }

  static async getMarkdownsByUserId(user_id: number) {
    const markdowns = await prisma.markdown.findMany({ where: { user_id } });
    return markdowns.map((markdown) => ({
      ...markdown,
      id: markdown.id.toString(),
      user_id: markdown.user_id.toString(),
    }));
  }

  static async createMarkdown(data: any) {
    try {
      const markdown = await prisma.markdown.create({ data });
      return {
        ...markdown,
        id: markdown.id.toString(),
        user_id: markdown.user_id.toString(),
      };
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("Unique constraint failed on the fields: (`user_id`)");
      }
      throw error;
    }
  }

  static async updateMarkdown(id: number, data: any) {
    try {
      const markdown = await prisma.markdown.update({ where: { id }, data });
      return {
        ...markdown,
        id: markdown.id.toString(),
        user_id: markdown.user_id.toString(),
      };
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("Unique constraint failed on the fields: (`user_id`)");
      }
      throw error;
    }
  }

  static async deleteMarkdown(id: number) {
    const markdown = await prisma.markdown.delete({ where: { id } });
    return {
      ...markdown,
      id: markdown.id.toString(),
      user_id: markdown.user_id.toString(),
    };
  }
}
