import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { authorizeRoles } from "../middlewares/authorization";
import { ReportsController } from "../controllers/reports.controller";

const router = Router();

router.post(
  "/reports/appointment/:id", 
  verifyToken,
  authorizeRoles("R3", "R4"), // Only psychologists can create reports
  ReportsController.createReport
);

router.get(
  "/reports",
  verifyToken,
  ReportsController.getAllReports
);

router.get(
  "/reports/:id",
  verifyToken,
  ReportsController.getReportById
);

export default router;