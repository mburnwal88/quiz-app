import mongoose, { Schema, Document } from "mongoose";

// export interface Question {
//     question_title: string;
//     options: string[];
//     correct_options: number[];
// }

// export interface Quiz extends Document {
//     title: string,
//     questions: Question[]
// }

// const QuestionSetSchema: Schema = new Schema({
//     question_title: { type: String, require: true },
//     options: { type: [String], require: true },
//     correct_options: { type: [Number], require: true }
// })

export interface Quiz extends Document {
    title: string,
    questions: String[]
}

// const QuizSchema: Schema = new Schema({
//     title: { type: String, required: true },
//     questions: { type: [QuestionSetSchema], required: true }
// })

const QuizSchema: Schema = new Schema({
    title: { type: String, required: true },
    questions: { type: [Object], required: true }
})

export const QuizModel = mongoose.model<Quiz>("QuizCollection", QuizSchema);