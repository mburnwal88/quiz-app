import mongoose, { Schema, Document } from "mongoose";

export interface Question extends Document {
    questionText: string,
    options: string[],
    correct_options: number[]
}

const QuestionSchema: Schema = new Schema({
    questionText: { type: String, required: true, unique: true },
    options: { type: [String], required: true },
    correct_options: {type: [Number], require: true}
})

export const QuestionModel = mongoose.model<Question>("Question", QuestionSchema);