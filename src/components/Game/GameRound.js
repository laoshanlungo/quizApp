import React, { useState, useEffect } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import mauritius from "../../static/mauritius.png";
import {Col, Row, Stack} from 'react-bootstrap';
import { MultipleChoiceQuestionCard, QuestionCard } from "../QuestionCards";
import questionFile from '../../static/questions.json';

const GameRound = () => {
  let { hash } = useLocation();
  const numberOfQuestionsPerRound = questionFile.filter(question => question.category === hash.slice(1)).length < 10 ? questionFile.filter(question => question.category === hash.slice(1)).length : 10;
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const userString = localStorage.getItem("token");

  useEffect(() => {
    getQuestions();
  }, []);


  const getQuestions = async () => {
    let questionsFiltered = questionFile.filter(question => question.category === hash.slice(1))
    let randomQuestions = [];
    for (let i = 0; i < numberOfQuestionsPerRound; i++) {
        randomQuestions.push(questionsFiltered[Math.floor(Math.random() * questionsFiltered.length)])
      

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
            <div className="d-flex flex-row justify-content-start">
        <Link to="/">
          <button className="button-back">Back</button>
        </Link>
      </div>
      <Stack gap={3} className="justify-content-center align-items-center">
      <div className="card-shadow shadow">
      <div>
      <h4 className="text-center">Question {currentQuestion+1} / {numberOfQuestionsPerRound}</h4>
      </div>
      <br />
      <br />
      <br />
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
    </div>
      </Stack>
    </Row>

  );
};

export default GameRound;
