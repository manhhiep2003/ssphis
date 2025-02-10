import { Router } from "express";
import { AppointmentsController } from "../controllers/appointments.controller";
import { verifyToken } from "../middlewares/jwtAction";
import { validateUserIdRequest } from "../middlewares/Psychologist/validateTimeSlotRequest";
import { validateAppointmentsRequest } from "../middlewares/Psychologist/validateAppointmentsRequest";

const router = Router();
router.get(
  "/appointments",
  verifyToken,
  AppointmentsController.getAllAppointments
);
router.get(
  "/appointments/:id",
  verifyToken,
  AppointmentsController.getAppointmentsById
);
router.get(
  "/appointmentsByUser",
  verifyToken,
  validateUserIdRequest,
  AppointmentsController.getAppointmentsByUserId
);
router.post(
  "/appointments-array",
  verifyToken,
  validateAppointmentsRequest,
  AppointmentsController.createAppointments
);
router.put(
  "/appointments/:id",
  verifyToken,
  AppointmentsController.updateAppointments
);
router.delete(
  "/appointments/:id",
  verifyToken,
  AppointmentsController.deleteAppointments
);

export default router;
