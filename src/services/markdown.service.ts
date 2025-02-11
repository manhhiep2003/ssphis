/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

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

  static async createMarkdown(data: any) {
    const markdown = await prisma.markdown.create({ data });
    return {
      ...markdown,
      id: markdown.id.toString(),
      user_id: markdown.user_id.toString(),
    };
  }

  static async updateMarkdown(id: number, data: any) {
    const markdown = await prisma.markdown.update({ where: { id }, data });
    return {
      ...markdown,
      id: markdown.id.toString(),
      user_id: markdown.user_id.toString(),
    };
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