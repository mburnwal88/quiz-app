import mongoose, { Schema, Document } from "mongoose";

export interface UserAnswer extends Document {
    question_text: string,
    user_selected_options: number[],
    isAnswerRight: boolean
}
export interface Result extends Document {
    quiz_id: string,
    user_id: string,
    score: number,
    answers: UserAnswer[]
}

const UserAnswerSchema: Schema = new Schema({
    question_text: { type: String, require: true },
    user_selected_options: { type: [Number] },
    isAnswerRight: {type: Boolean, require: true}

})
const ResultSchema: Schema = new Schema({
    quiz_id: { type: String, required: true },
    user_id: { type: String, required: true },
    score: { type: Number, default: 0 },
    answers: { type: [UserAnswerSchema], }
})

ResultSchema.index({ quiz_id: 1, user_id: 1 }, { unique: true });

export const ResultModel = mongoose.model<Result>("Result", ResultSchema);