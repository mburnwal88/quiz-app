import express from "express";
import { createQuestion, getQustionOptions, getQustionCorrectAnswer, submitAnswer } from "../controllers/questionController"

const router = express.Router();

router.post("/", createQuestion);
router.post("/get-options", getQustionOptions);
router.post("/get-answer", getQustionCorrectAnswer)
router.post("/submit-answer", submitAnswer)

export default router;