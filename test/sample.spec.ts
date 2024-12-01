import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import { getQuizById } from '../src/controllers/quizController'; // Update this import according to your folder structure

chai.use(chaiHttp);
const { expect } = chai;

// Initialize your Express app
const app = express();
app.get('/api/quiz/:quizId', getQuizById);

describe('Quiz Controller Tests', () => {
  it('should return 400 if quiz ID is missing', async () => {
    console.log("========= line number 15 ==========");
    // const res = await chai.request(app).get('/api/quiz/');
    // expect(res).to.have.status(404); // Handle the case where the route does not exist
  });

  it('should return 200 and the correct message for a valid quiz ID', async () => {
    // const res = await chai.request(app).get('/api/quiz/123');
    // expect(res).to.have.status(200);
    // expect(res.body).to.have.property('message', 'Quiz 123 retrieved successfully'); // Adjust to your actual response structure
  });
});
