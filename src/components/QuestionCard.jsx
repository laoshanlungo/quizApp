import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import mauritius from '../static/mauritius.png';

const QuestionCard = ({ question, answers, solve, picture }) => {
  const [answer, setAnswer] = useState(null);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? 'Correct!' : 'Nope, try again');
  };

  const AnswerField = (input) => {
    const { index } = input;
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Button onClick={() => handleAnswer(index)} variant="primary">
            {answers[index]}
          </Button>
        </Card.Body>
      </Card>
    );
  };


  return (
    <div className=" d-flex flex-column align-items-center">
      <div className="d-flex flex-row">
        <Card className="align-items-center" style={{ width: "36rem" }}>
          <Card.Body>
            <h5 class="card-title">{question}</h5>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex flex-row">
        <AnswerField index="0" />
        <AnswerField index="1" />
      </div>
      <div className="d-flex flex-row">
        <AnswerField index="2" />
        <AnswerField index="3" />
      </div>
      <div className="d-flex flex-row">
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
