import { Request, Response } from "express";
import { QuizModel } from "../db/models/quizModel";
import { createUserWithQuizId } from "./resultController";
export const createQuiz = async (req: Request, res: Response) => {
  try {
    if (req.body.title && req.body.questions.length) {
      const result = await QuizModel.insertMany(req.body);
      res.status(201).json({ message: result });
    }else {
      res.status(401).json({ message: "Please provide valid quiz title or quiz must have at least one question"});
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllQuizId = async (req: Request, res: Response) => {
  try {
    const result = await QuizModel.find({}, { _id: 1 });
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await QuizModel.findOne({ _id: req.params.quizId }, { _id: 0, questions: { correct_options: 0 } });
    if (result) {
      const userCreatedWithQuiz = await createUserWithQuizId(req, res);
      if (userCreatedWithQuiz) {
        res.status(201).json({ message: result });
      } else {
        res.status(401).json({ message: "Unable to start your test." });
      }
    } else {
      res.status(404).json({ message: "Given Quiz is not available." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};