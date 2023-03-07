import React, { useState, useEffect } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import mauritius from "../../static/mauritius.png";
import { Col, Row, Stack, ProgressBar } from "react-bootstrap";
import { MultipleChoiceQuestionCard, QuestionCard } from "../QuestionBody";
import questionFile from "../../static/questions.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GameRound = () => {
  let { hash } = useLocation();
  const numberOfQuestionsPerRound =
    questionFile.filter((question) => question.category === hash.slice(1))
      .length < 10
      ? questionFile.filter((question) => question.category === hash.slice(1))
          .length
      : 10;
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const userString = localStorage.getItem("token");

  useEffect(() => {
    getQuestions();
  }, []);

  let percentage = (currentQuestion / numberOfQuestionsPerRound) * 100;

  const getQuestions = async () => {
    let questionsFiltered = questionFile.filter(
      (question) => question.category === hash.slice(1)
    );
    let randomQuestions = [];
    for (let i = 0; i < numberOfQuestionsPerRound; i++) {
      let random = Math.floor(Math.random() * questionsFiltered.length);
      randomQuestions.push(questionsFiltered[random]);
      questionsFiltered.splice(random, 1);
    }
    setQuestions(randomQuestions);
  };

  const restartRound = () => {
    setScore(0);
    setCurrentQuestion(0);
  };

  const persistScore = async () => {
    try {
      const res = await fetch("http://localhost:3001/setScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberOfQuestionsPerRound, score, userString }),
      });
    } catch (error) {
      return error;
    }
  };

  const updateGame = async (raiseScore) => {
    if (currentQuestion > numberOfQuestionsPerRound - 2) {
      await persistScore();
    }
    setCurrentQuestion(currentQuestion + 1);
    if (raiseScore) {
      if (currentQuestion > numberOfQuestionsPerRound - 1) {
        await persistScore();
      }
      setScore(score + 1);
      return;
    }
  };

  if (questions.length < 1) {
    return null;
  }
  if (currentQuestion > numberOfQuestionsPerRound - 1) {
    return (
      <div>
        <p>
          You have scored {score} out of {numberOfQuestionsPerRound} questions
          correct. Good job! Your score has been added to your statistics!
        </p>
        <Link to="/">
          <button className="button-19">Back</button>
        </Link>
        <button className="button-19" onClick={restartRound}>
          Try Another Round!
        </button>
      </div>
    );
  }
  return (
    <Row>
      <div className="d-flex flex-row justify-content-start"></div>
      <Stack gap={3} className="justify-content-center align-items-center">
        <div className="card-shadow shadow question-card">
          <Col className="question-card-header justify-content-center">
            <Row className="justify-content-center">
              <div style={{ width: 150, height: 150 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${currentQuestion + 1}/${numberOfQuestionsPerRound}`}
                  styles={buildStyles({
                    textSize: "36px",
                  })}
                />
              </div>
            </Row>
            <Row>
              <div className="question-headline">
                <h2 className="card-title text-center">
                  {questions[currentQuestion].question}?
                </h2>
              </div>
            </Row>
          </Col>
          <Col className="question-card-body">
            {questions[currentQuestion].multiplechoice === true ? (
              <MultipleChoiceQuestionCard
                question={questions[currentQuestion].question}
                answers={questions[currentQuestion].answers}
                solve={questions[currentQuestion].solve}
                picture={mauritius}
                updateGame={updateGame}
                score={score}
              />
            ) : (
              <QuestionCard
                question={questions[currentQuestion].question}
                solve={questions[currentQuestion].solve}
                multiplechoice={questions[currentQuestion].multiplechoice}
                picture={mauritius}
                updateGame={updateGame}
                score={score}
              />
            )}
          </Col>
          <ProgressBar
            animated
            variant="success"
            now={(currentQuestion / numberOfQuestionsPerRound) * 100}
          />
        </div>
      </Stack>
    </Row>
  );
};

export default GameRound;
