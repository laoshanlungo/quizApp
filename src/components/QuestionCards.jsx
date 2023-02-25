import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import "../styles.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const QuestionCard = ({ question, solve, picture, updateGame, score }) => {
  const [answer, setAnswer] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [guess, setGuess] = useState("");
  const [counter, setCounter] = useState(1);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = () => {
    let isCorrectAnswer =
      guess.toLowerCase().localeCompare(solve.toLowerCase()) === 0;
    setAnswer(isCorrectAnswer ? "RICHTIG!!!!" : "LEIDER FALSCH");
    setInputDisabled(true);
    setIsActive(true);
    // setTimeout(() => {

    // }, 2000);
  };

  return (

    <Col>
      <Row>
        <div className="question-headline">
            <h5 className="card-title text-center">{question}</h5>
            </div>
      </Row>
      <div className="h-1 d-flex flex-row flex-fill justify-content-center">
<div className="question-body">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Antwort</Form.Label>
              <Form.Control
                type="input"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <Button type="submit" onClick={handleSubmit}>
                Abschicken
              </Button>
              {inputDisabled && answer}
              {inputDisabled && (
                <CountdownCircleTimer
                size={50}
                  onComplete={() => {
                    setIsActive(false);
                    updateGame(
                      guess.toLowerCase().localeCompare(solve.toLowerCase()) ===
                        0
                    );
                    setInputDisabled(false);
                    setGuess("");
                  }}
                  isPlaying
                  duration={counter}
                  colors="#808080"
                >
                  <h1>{counter}</h1>
                </CountdownCircleTimer>
              )}
            </Form.Group>{" "}
</div>
      </div>
    </Col>
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
  const [counter, setCounter] = useState(100);
  const [isActive, setIsActive] = useState(true);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? "Correct!" : "Nope, try again");
    setFieldsDisabled(true);
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
      {fieldsDisabled && (
        <Row className="justify-content-center align-items-center">
          <Col md="auto">
            <CountdownCircleTimer
            size={50}
              onComplete={() => {
                setIsActive(false);
                setFieldsDisabled(false);
                updateGame(answer === "Correct!");
              }}
              isPlaying
              duration={counter}
              colors="#808080"
            >
              <h1>{counter}</h1>
            </CountdownCircleTimer>
          </Col>
          <Col md="auto">
            <h1>{answer}</h1>
          </Col>
        </Row>
      )}
    </div>
  );
};

export { QuestionCard, MultipleChoiceQuestionCard };
