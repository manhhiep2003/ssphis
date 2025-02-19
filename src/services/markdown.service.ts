/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  CreateMarkdownDto,
  UpdateMarkdownDto,
} from "../interfaces/markdown.interface";

const prisma = new PrismaClient();
// Helper function to serialize BigInt
const serializeMarkdown = (markdown: any) => ({
  ...markdown,
  id: markdown.id.toString(),
  user_id: markdown.user_id.toString(),
  category_id: markdown.category_id.toString(),
  user: markdown.user
    ? {
        ...markdown.user,
        id: markdown.user.id.toString(),
      }
    : undefined,
  category: markdown.category
    ? {
        ...markdown.category,
        categoryId: markdown.category.categoryId.toString(),
      }
    : undefined,
});
export class MarkdownService {
  static async getAllMarkdowns() {
    const markdowns = await prisma.markdown.findMany({
      include: {
        user: true,
        category: true,
      },
    });
    return markdowns.map(serializeMarkdown);
  }

  static async getMarkdownById(id: number) {
    const markdown = await prisma.markdown.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
      },
    });
    return markdown ? serializeMarkdown(markdown) : null;
  }

  static async getMarkdownsByUserId(user_id: number) {
    const markdowns = await prisma.markdown.findMany({
      where: { user_id },
      include: {
        user: true, // Fetch user details
        category: true, // Fetch category details
      },
    });
    return markdowns.map(serializeMarkdown);
  }

  static async createMarkdown(data: CreateMarkdownDto) {
    try {
      const markdown = await prisma.markdown.create({
        data: {
          contentHtml: data.contentHtml,
          contentMarkdown: data.contentMarkdown,
          imgageUrl: data.imgageUrl,
          title: data.title,
          hashtag: data.hashtag,
          description: data.description,
          user_id: BigInt(data.user_id),
          category_id: BigInt(data.category_id),
          createdBy: data.createdBy,
        },
        include: {
          user: true,
          category: true,
        },
      });
      return serializeMarkdown(markdown);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new Error(
            "Foreign key constraint failed - Invalid user_id or category_id"
          );
        }
      }
      throw error;
    }
  }

  static async updateMarkdown(id: number, data: UpdateMarkdownDto) {
    try {
      const markdown = await prisma.markdown.update({
        where: { id },
        data: {
          contentHtml: data.contentHtml,
          contentMarkdown: data.contentMarkdown,
          imgageUrl: data.imgageUrl,
          title: data.title,
          hashtag: data.hashtag,
          description: data.description,
          category_id: data.category_id ? BigInt(data.category_id) : undefined,
          updatedBy: data.updatedBy,
        },
        include: {
          user: true,
          category: true,
        },
      });
      return serializeMarkdown(markdown);
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
