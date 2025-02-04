import { Request, Response, NextFunction } from "express";

export function validateRoleRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { roleCode, roleName } = req.body;
  if (!roleCode || !roleName) {
    res.status(400).json({ message: "roleCode and roleName are required" });
  } else {
    next();
  }
}
