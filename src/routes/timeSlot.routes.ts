import { Router } from "express";
import { TimeSlotController } from "../controllers/timeSlot.controller";
import { verifyToken } from "../middlewares/jwtAction";
import {
  validateTimeSlotsRequest,
  validateUserIdRequest,
} from "../middlewares/Psychologist/validateTimeSlotRequest";

const router = Router();
router.get("/timeSlot", verifyToken, TimeSlotController.getAllTimeSlots);
router.get("/timeSlot/:id", verifyToken, TimeSlotController.getTimeSlotById);
router.get(
  "/timeSlotByUser",
  verifyToken,
  validateUserIdRequest,
  TimeSlotController.getTimeSlotByUserId,
);
router.post(
  "/timeSlot-array",
  verifyToken,
  validateTimeSlotsRequest,
  TimeSlotController.createTimeSlots,
);
router.put("/timeSlot/:id", verifyToken, TimeSlotController.updateTimeSlot);
router.delete("/timeSlot/:id", verifyToken, TimeSlotController.deleteTimeSlot);

// // Add new routes for manual triggering if needed
// router.post(
//   "/timeSlot/auto-update",
//   verifyToken,
//   TimeSlotController.autoUpdateStatus
// );
// router.post(
//   "/timeSlot/reset-daily",
//   verifyToken,
//   TimeSlotController.resetDailySlots
// );

export default router;
