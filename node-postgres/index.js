const express = require("express");
const app = express();
const port = process.env.port || 3001;
const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "davidmichel",
  password: "root",
  port: 5432,
});


const login_model = require("./login_model");
const question_model = require("./question_model");
const score_model = require("./score_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  question_model
    .getQuestions()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/questions", (req, res) => {
  question_model
    .createQuestion(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/questions/:id", (req, res) => {
  question_model
    .deleteQuestion(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/login", async (req, res) => {
  const { credentials } = req.body;
  const test = await login_model.getLogin(credentials);
  switch (test) {
    case "noUser":
      res.status(200).send("1");
      break;
    case "success":
      res.status(200).send(true);
      break;
    default:
      res.status(200).send(false);
  }
});

app.post("/signup", async (req, res) => {
  const { credentials } = req.body;
  const test = await login_model.signupUser(credentials);
  switch (test) {
    case "userAlreadyExists":
      res.status(200).send("1");
      break;
    case "success":
      res.status(200).send(true);
      break;
    default:
      res.status(200).send(false);
  }
});

app.post("/setScore", async (req, res) => {
  const input  = req.body;
  const { numberOfQuestionsPerRound, score, userString } = input;

  const updatedUserString = userString.replace(/^"(.*)"$/, "$1");
  console.log(updatedUserString, "yolo")
  const test = await score_model
    .setScore({numberOfQuestionsPerRound, score, updatedUserString})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
