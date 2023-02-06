import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { QuizLayout } from "../../pages/layouts/QuizLayout";
import  mauritius  from '../../static/mauritius.png';
import QuestionCard from '../QuestionCard';


const GameRound = ({questions}) => {
  const numberOfQuestionsPerRound = 2;
  const [score, setScore] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateGame = (raiseScore) => {
    if(raiseScore){
        setCurrentQuestion(currentQuestion +1);
        setScore(score+1)
        return;
    }
    setCurrentQuestion(currentQuestion +1);
  }

  const handleQuestionSubmit = () => {
    setCurrentQuestion(currentQuestion + 1);
    return null;
  };
  return (
    <div>
      {currentQuestion > numberOfQuestionsPerRound - 1 && (
        <Navigate to="/" replace={true} />
      )}
      <QuestionCard question={questions[currentQuestion].question} answers={questions[currentQuestion].answers} solve={questions[currentQuestion].solve} picture={mauritius} updateGame={updateGame} score={score} />
      <button className="button-19" onClick={handleQuestionSubmit}>
        Questions
      </button>
      <p>{currentQuestion + " is the number of the currentQuestion "}</p>
      <p>{score + " is the number of correct questions "}</p>

    </div>
  );
};

export default GameRound;
