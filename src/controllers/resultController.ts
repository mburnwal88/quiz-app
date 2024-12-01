import { Request, Response } from "express";
import { ResultModel } from "../db/models/resultModel";

export const createUserWithQuizId = async (req: Request, res: Response) => {
  try {
    return await ResultModel.findOneAndUpdate({
      quiz_id: req.params.quizId, user_id: req.params.userId
    },
      {
        score: 0
      },
      {
        new: true,
        upsert: true
      }
    )
  } catch (error) {
    throw Error(`Unable to create dashboard for user ${req.params.userId} for quiz ${req.params.quizId}`)
  }
};

export const userResult = async (req: Request, isAnswerCorrect: boolean) => {
  let update = {};
  if (isAnswerCorrect) {
    update = {
      $inc: { score: 1 },
      $push: {
        answers: { question_text: req.body.questionText, user_selected_options: req.body.selected_options, isAnswerRight: isAnswerCorrect }
      }
    }
  } else {
    update = {
      $push: {
        answer: { question_text: req.body.questionText, user_selected_options: req.body.selected_options, isAnswerRight: isAnswerCorrect }
      }
    }
  }
  const result = await ResultModel.findOneAndUpdate({
    quiz_id: req.body.quiz_id, user_id: req.body.user_id
  },
    update,
    { new: true }
  )

  return result;
}

export const getUserFinalResult = async (req: Request, res: Response) => {
  if (!req.params.quiz_id || !req.params.user_id) {
    res.status(404).json({ message: "Please provide valid user or quiz." });
  } else {
    const result = await ResultModel.findOne({
      quiz_id: req.params.quiz_id, user_id: req.params.user_id
    });
    if (!result) {
      res.status(404).json({ message: "Provided user result not available." });
    } else {
      res.status(202).json(result);
    }
  }
}