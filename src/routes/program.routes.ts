import { Router } from "express";
import { verifyToken } from "../middlewares/jwtAction";
import { ProgramController } from "../controllers/program.controller";

const router = Router();
router.post("/program", verifyToken, ProgramController.createProgram);
router.post("/program/join", verifyToken, ProgramController.joinPrograms);
router.get("/program/user/:id", verifyToken, ProgramController.getProgramsByUserId);
router.get("/program", verifyToken, ProgramController.getAllPrograms);
router.get("/program/:id", verifyToken, ProgramController.getProgramById);
router.put("/program/:id", verifyToken, ProgramController.updateProgram);
router.delete("/program/:id", verifyToken, ProgramController.deleteProgram);

export default router;
