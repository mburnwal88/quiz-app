import express from "express";
import { createQuiz, getQuizById, getAllQuizId } from "../controllers/quizController"

const router = express.Router();

router.get("/", getAllQuizId);
router.post("/", createQuiz);
router.get("/:quizId/:userId", getQuizById);

export default router;