/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatus";

// Define custom types for enhanced type safety
interface UserRequest extends Request {
  user?: {
    roleCode?: string;
    userId?: string;
  };
}

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction): void => {
    try {
      const userRole = req.user?.roleCode;

      if (!userRole) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Authentication required. Please login first.",
        });
        return;
      }

      // If no specific roles are provided, allow access with any role
      if (allowedRoles.length === 0) {
        next();
        return;
      }

      // Check if user's role is in the allowed roles list
      if (!allowedRoles.includes(userRole)) {
        res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: `Access denied. Required roles: ${allowedRoles.join(", ")}`,
        });
        return;
      }

      next();
    } catch (error: any) {
      console.log(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Authorization process failed",
      });
    }
  };
};
