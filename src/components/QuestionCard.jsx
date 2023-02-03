import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import '../styles.css';
import mauritius from '../static/mauritius.png';

const QuestionCard = ({ question, answers, solve, picture }) => {
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? 'Correct!' : 'Nope, try again');
  };

  const AnswerField = (input) => {
    const { index } = input;
    return (
      <div className="col-2 flex-fill answers-row">
          <Button className="button-19 w-100 answers-row" onClick={() => handleAnswer(index)} variant="primary">
            {answers[index]}
          </Button>
        </div>
    );
  };


  return (
    <div className="h-50 d-flex flex-column">
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <Card className="flex-fill" >
          <Card.Body>
            <h5 class="card-title text-center">{question}</h5>
          </Card.Body>
        </Card>
      </div>
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <AnswerField index="0" />
        <AnswerField index="1" />
      </div>
      <div className="h-33 d-flex flex-row flex-fill justify-content-center answers-row">
        <AnswerField index="2" />
        <AnswerField index="3" />
      </div>
      <div className="h-1 d-flex flex-row">
        <Card className="align-items-center" style={{ width: "36rem" }}>
          <Card.Body>
            <h5 class="card-title">{answer}</h5>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;
