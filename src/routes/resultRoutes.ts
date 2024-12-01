import express from "express";
import { getUserFinalResult } from "../controllers/resultController"

const router = express.Router();

router.get("/:quiz_id/:user_id", getUserFinalResult);

export default router;