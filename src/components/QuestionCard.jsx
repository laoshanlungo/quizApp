import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import '../styles.css';

const QuestionCard = ({ question, answers, solve, picture, updateGame, score }) => {
  const [answer, setAnswer] = useState(null);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? 'Correct!' : 'Nope, try again');
    setFieldsDisabled(true);
    setTimeout(() => {
      updateGame(index === solve)
      setFieldsDisabled(false);
    }, 500);
  };

  const AnswerField = (input, disabled) => {
    const { index } = input;
    return (
      <div className="col-2 flex-fill answers-row">
          <Button disabled={fieldsDisabled} className="button-19 w-100 answers-row" onClick={() => handleAnswer(index)} variant="primary">
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
            <h5 className="card-title text-center">{question}</h5>
          </Card.Body>
        </Card>
      </div>
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <AnswerField index="0" disabled={fieldsDisabled} />
        <AnswerField index="1" disabled={fieldsDisabled} />
      </div>
      <div className="h-33 d-flex flex-row flex-fill justify-content-center answers-row">
      <AnswerField index="2" disabled={fieldsDisabled} />
      <AnswerField index="3" disabled={fieldsDisabled} />
      </div>
      <div className="h-1 d-flex flex-row">
        <Card className="align-items-center" style={{ width: "36rem" }}>
          <Card.Body>
            <h5 className="card-title">{answer}</h5>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;
