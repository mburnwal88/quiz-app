import mongoose, { Schema, Document } from "mongoose";

export interface Answer extends Document {
    question_id: string,
    selected_options: number[],
    is_correct: boolean
}

const AnswerSchema: Schema = new Schema({
    question_id: { type: String, required: true, unique: true },
    options: { type: [String], required: true },
    correct_option: {type: [Number], require: true}
})

export const AnswerModel = mongoose.model<Answer>("Answer", AnswerSchema);