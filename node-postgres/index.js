const express = require("express");
const app = express();
const port = process.env.port || 3001;

console.log(process.env.DB_URL, "DBURL")
//TO DO: Figure out how to properly set Database user/address in case of remote hosting. 
// TO DO: Figure out Migrations
//TO DO: Add Prisma as Database layer (ORM)
//TO DO: hashing / salting passwords or use library
//TO DO: read up on uuid's and their advantages in comparison to incremental id's
//TO DO: change api calls to /api and not localhost:3001



const bcrypt = require("bcrypt");



const login_model = require("./login_model");
const question_model = require("./question_model");
const score_model = require("./score_model");
const statistics_model = require("./statistics_model");

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
  const test = await score_model
    .setScore({numberOfQuestionsPerRound, score, updatedUserString})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


app.post("/statistics", async (req, res) => {
  const input  = req.body;
  const { userString } = input;

  const updatedUserString = userString.replace(/^"(.*)"$/, "$1");


  await statistics_model
    .getStatistics({updatedUserString})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/highscores", async (req, res) => {
    await await score_model.getHighScores()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
