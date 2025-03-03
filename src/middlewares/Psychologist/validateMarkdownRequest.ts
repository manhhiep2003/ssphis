/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import HTTP_STATUS from "../../constants/httpStatus";

const prisma = new PrismaClient();

export async function validateMarkdownRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const {
    contentHtml,
    contentMarkdown,
    title,
    description,
    user_id,
    category_id,
    imgageUrl,
    hashtag,
  } = req.body;

  if (
    !contentHtml ||
    !contentMarkdown ||
    !title ||
    !description ||
    !user_id ||
    !category_id ||
    !imgageUrl
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required fields",
      error:
        "All fields are required: contentHtml, contentMarkdown, title, description, user_id, category_id, imgageUrl",
    });
    return;
  }

  // Validate data types
  if (
    typeof contentHtml !== "string" ||
    typeof contentMarkdown !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof imgageUrl !== "string"
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid data types",
      error: "Content fields must be strings",
    });
    return;
  }

  // Validate hashtag array if provided
  if (hashtag && !Array.isArray(hashtag)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid hashtag format",
      error: "Hashtag must be an array of strings",
    });
    return;
  }

  // Validate numeric fields
  if (isNaN(Number(user_id)) || isNaN(Number(category_id))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Invalid ID format",
      error: "user_id and category_id must be numbers",
    });
    return;
  }

  next();
}
