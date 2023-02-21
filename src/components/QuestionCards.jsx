import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "../styles.css";

const QuestionCard = ({ question, solve, picture, updateGame, score }) => {
  const [answer, setAnswer] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [guess, setGuess] = useState('');

  const handleSubmit = () => {
    let isCorrectAnswer = (guess.toLowerCase()).localeCompare(solve.toLowerCase()) === 0;
    setAnswer(isCorrectAnswer ? 'RICHTIG!!!!' : 'DAS WAR SO FALSCH DU EUMEL')
    setInputDisabled(true);
    setTimeout(() => {
      updateGame(isCorrectAnswer);
      setInputDisabled(false);
      setGuess('')
    }, 500);
  }

  return (
    <div className="h-50 d-flex flex-column">
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <Card className="flex-fill">
          <Card.Body>
            <h5 className="card-title text-center">{question}</h5>
          </Card.Body>
        </Card>
      </div>
      <div className="h-1 d-flex flex-row flex-fill justify-content-center">
        <Card className="align-items-center" style={{ width: "36rem" }}>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Antwort</Form.Label>
              <Form.Control
                type="input"
                value={guess}
                onChange={(e) =>
                  setGuess(e.target.value)
                }
              />
                      <Button type="submit" onClick={handleSubmit}>Abschicken</Button>
                      {inputDisabled && answer}
            </Form.Group>{" "}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const MultipleChoiceQuestionCard = ({
  question,
  solve,
  answers,
  picture,
  updateGame,
  score,
}) => {
  const [answer, setAnswer] = useState(null);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? "Correct!" : "Nope, try again");
    setFieldsDisabled(true);
    setTimeout(() => {
      updateGame(index === solve);
      setFieldsDisabled(false);
    }, 500);
  };

  const AnswerField = (input, disabled) => {
    const { index } = input;
    return (
      <div className="col-2 flex-fill">
        <button
          disabled={fieldsDisabled}
          className="quiz-button w-100"
          onClick={() => handleAnswer(index)}
          variant="primary"
        >
          {answers[index]}
        </button>
      </div>
    );
  };

  return (
    <div className="h-50 d-flex flex-column">
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <Card className="flex-fill">
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

export { QuestionCard, MultipleChoiceQuestionCard };
