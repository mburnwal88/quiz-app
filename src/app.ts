import express from "express";
import bodyParser from "body-parser";

import createQuiz from "./routes/quizRoutes";
import createQuestion from "./routes/questionRoutes";
import getUserResult from "./routes/resultRoutes"

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/quiz", createQuiz);
app.use("/api/question", createQuestion);
app.use("/api/result", getUserResult);

export default app;
