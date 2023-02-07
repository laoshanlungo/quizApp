import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import mauritius from "../../static/mauritius.png";
import QuestionCard from "../QuestionCard";

const GameRound = () => {
  const numberOfQuestionsPerRound = 10;
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const userString = localStorage.getItem("token");

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setQuestions(data);
    setLoading(false);
  };

  const restartRound = () => {
    setScore(0);
    setCurrentQuestion(0);
  }

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
        await persistScore()
      }
    setCurrentQuestion(currentQuestion + 1);
    if (raiseScore) {
      if (currentQuestion > numberOfQuestionsPerRound - 1) {
        await persistScore()
      }
      setScore(score + 1);
      return;
    }
  };

  const handleQuestionSubmit = () => {
    setCurrentQuestion(currentQuestion + 1);
    return null;
  };

  if (loading) {
    return null;
  }
  if(currentQuestion > numberOfQuestionsPerRound -1){
    return(
        <div>
            <p>You have scored {score} out of {numberOfQuestionsPerRound} questions correct. Good job!</p>
            <Link to="/">
        <button className="button-19">Back</button>
      </Link>
            <button className="button-19" onClick={restartRound}>
              Restart
            </button>
        </div>

    )
  }
  return (
    <div>
      <Link to="/">
        <button className="button-19">Back</button>
      </Link>
      <QuestionCard
        question={questions[currentQuestion].question}
        answers={questions[currentQuestion].answers}
        solve={questions[currentQuestion].solve}
        picture={mauritius}
        updateGame={updateGame}
        score={score}
      />
      <button className="button-19" onClick={handleQuestionSubmit}>
        Questions
      </button>
      {/* <button className="button-19" onClick={persistScore}>
        Persist Score
      </button> */}
      <p>{currentQuestion + " is the number of the currentQuestion "}</p>
      <p>{score + " is the number of correct questions "}</p>
    </div>
  );
};

export default GameRound;
