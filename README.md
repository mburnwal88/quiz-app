# Quiz API Documentation

# Pre-requisites
- Install [Node.js] version 20.0.0


# Getting started
- Clone the repository
```
git clone  <https://github.com/mburnwal88/quiz-app.git>
```
- Install dependencies
```
cd quiz_app
npm install
```
- Build and run the project
```
npx nodemon src/server.ts
```
  Navigate to `http://localhost:5000`

- API Document endpoints

  Quiz Endpoint : http://localhost:5000/api/quiz

  Question  Endpoint : http://localhost:5000/api/question

  Result  Endpoint : http://localhost:5000/api/result



## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/controllers**      | Controllers define functions to serve various express routes.
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src**/server.ts         | Entry point to express app                                                            |
| **src**/app.ts         | Instance Of Express created                                     |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    |

## Building the project
### Configuring TypeScript compilation
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}


```




# Note

## Unit Test Case Not Implemented Yet

This is a REST API for managing quiz operations, built using Node.js, Express, and TypeScript. The API supports various operations like retrieving quizzes, submitting answers, and getting user scores.

## Base URL
http://localhost:5000/api


## API Endpoints

---

### **QUIZ**

#### 1. **Create New Quiz**
- **Method**: `POST`
- **Endpoint**: `/quiz`
- **Request Body**:
    ```json
    {
        "title": "Computer Quiz",
        "questions": [
            {
                "question_title": "Is RAM Memory"
            },
            {
                "question_title": "Is computer a robot"
            }
        ]
    }
    ```
- **Success Response**:
    - **Code**: `201 Created`
    - **Content**:
      ```json
      {
        "message": "Quiz created successfully",
        "quiz_id": "674b6474c0ac19392a5dd9d0"
      }
      ```
- **Error Response**:
    - **Code**: `400 Bad Request`
    - **Content**:
      ```json
      {
        "message": "Invalid data"
      }
      ```

#### 2. **Get All Quiz IDs**
- **Method**: `GET`
- **Endpoint**: `/quiz`
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      [
        {
          "quiz_id": "674b6474c0ac19392a5dd9d0",
          "title": "Computer Quiz"
        }
      ]
      ```

#### 3. **Get/Start Specific Quiz**
- **Method**: `GET`
- **Endpoint**: `/quiz/{quizId}/{userId}`
- **URL Params**:
    - `quizId`: The ID of the quiz to retrieve.
    - `userId`: The ID of the user starting the quiz.
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "quiz_id": "674b6474c0ac19392a5dd9d0",
        "user_id": "mburnwal96",
        "questions": [
          {
            "question_id": "1",
            "question_text": "Is RAM Memory"
          }
        ]
      }
      ```

---

### **QUESTION**

#### 4. **Add New Question**
- **Method**: `POST`
- **Endpoint**: `/question`
- **Request Body**:
    ```json
    [
        {
            "questionText": "Is RAM Memory",
            "options": [
                "Yes",
                "No",
                "Don't Know",
                "Pass"
            ],
            "correct_options": [1]
        },
        {
            "questionText": "Is computer a robot",
            "options": [
                "Yes",
                "No",
                "Don't Know",
                "Pass"
            ],
            "correct_options": [3]
        }
    ]
    ```
- **Success Response**:
    - **Code**: `201 Created`
    - **Content**:
      ```json
      {
        "message": "Questions added successfully"
      }
      ```

#### 5. **Get Options for a Single Question**
- **Method**: `POST`
- **Endpoint**: `/question/get-options`
- **Request Body**:
    ```json
    {
        "questionText": "Is RAM Memory"
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "options": [
            "Yes",
            "No",
            "Don't Know",
            "Pass"
        ]
      }
      ```

#### 6. **Get Correct Answer for a Specific Question**
- **Method**: `POST`
- **Endpoint**: `/question/get-answer`
- **Request Body**:
    ```json
    {
        "questionText": "Is RAM Memory"
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```json
      {
        "correct_answer": "Yes"
      }
      ```

#### 7. **Submit Answer for a Specific Question**
- **Method**: `POST`
- **Endpoint**: `/question/submit-answer`
- **Request Body**:
    ```json
    {
        "quiz_id": "674b6474c0ac19392a5dd9d0",
        "user_id": "mburnwal96",
        "questionText": "Is RAM Memory",
        "selected_options": [1]
    }
    ```
- **Success Response**:
    - **Code**: `200 OK`
    - **Content**:
      ```j
