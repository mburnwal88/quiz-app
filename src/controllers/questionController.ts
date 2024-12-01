import { Request, Response } from "express";
import { QuestionModel } from "../db/models/questionModel";
import { userResult } from "./resultController";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const result = await QuestionModel.insertMany(req.body);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getQustionOptions = async (req: Request, res: Response) => {
  try {
    if (req.body.questionText) {
      const result = await QuestionModel.findOne({ questionText: req.body.questionText }, { _id: 0, correct_options: 0, __v: 0 });
      if (!result) {
        // Handle case when no result is found
        res.status(404).json({ message: "Question not found" });
      } else {
        res.status(201).json({ message: result });
      }
    } else {
      res.status(404).json({ message: "Please provide correct question." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getQustionCorrectAnswer = async (req: Request, res: Response) => {
  try {
    if (!req.body.questionText) {
      res.status(404).json({ message: "Please provide question." });
    } else {
      const result = await QuestionModel.findOne({ questionText: req.body.questionText }, { _id: 0, questionText: 0, options: 0, __v: 0 });
      if (!result) {
        res.status(404).json({ message: "Question not found" });
      } else {
        res.status(201).json({ message: result });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const result = await QuestionModel.findOne({ questionText: req.body.questionText }, { questionText: 0, __v: 0 });
    if (!result) {
      res.status(404).json({ message: "Question not found" });
    } else {
      if (req.body.selected_options.length == result?.correct_options.length) {
        let isAnswerCorrect = true;
        let correctAnswer: string[] = [];
        result?.correct_options.map((eachIndex: number) => {
          if (req.body.selected_options.indexOf(eachIndex) == -1) {
            isAnswerCorrect = false;
          }
          correctAnswer.push(result.options[eachIndex]);
        });
        // Call userResult method from result controller to update the score
        await userResult(req, isAnswerCorrect);
        if (isAnswerCorrect) {
          res.status(201).json({ message: "Correct Answer", correct_option: correctAnswer })
        } else {
          res.status(201).json({ message: "Incorrect Answer 1", correct_option: correctAnswer })
        }
      } else {
        res.status(201).json({ message: "Incorrect Answer 2", correct_option: result?.correct_options })
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}