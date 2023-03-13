import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import "../styles.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import AnswerFields from "./Game/MultipleChoiceAnswers";

const QuestionCard = ({ question, solve, picture, updateGame, score }) => {
  const [answer, setAnswer] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [guess, setGuess] = useState("");
  const countDownDuration = 100;
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
    <Row>
      <Col className="h-1 d-flex flex-row flex-fill question-body justify-content-center">
        <Form.Group className="justify-content-center mb-3">
          <Row className="justify-content-center">
            <Form.Control
              type="input"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </Row>
          <Row className="justify-content-center mt-2">

          <button className="submit-button" type="submit" onClick={handleSubmit}>
            Abschicken
          </button>
          </Row>
          {inputDisabled &&
          <Row className="justify-content-center text-right">
            <Col className="text-end">
          <h3 className="text-end" style={{ color: "#1b232a" }}>{answer}</h3>
          </Col>
          <Col>
          <div className="justify-content-center">
                        <CountdownCircleTimer 
                        className="centered"
                size={50}
                onComplete={() => {
                  setIsActive(false);
                  updateGame(
                    guess.toLowerCase().localeCompare(solve.toLowerCase()) === 0
                  );
                  setInputDisabled(false);
                  setGuess("");
                }}
                isPlaying
                duration={countDownDuration}
                colors="#808080"
              />
              </div>
              </Col>
          </Row>
}
        </Form.Group>{" "}
      </Col>
    </Row>
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
  const countDownDuration = 3;
  const [isActive, setIsActive] = useState(true);

  const handleAnswer = (index) => {
    setAnswer(index === solve ? "Correct!" : "Nope, try again");
    setFieldsDisabled(true);
  };

  return (
    <div className="h-50 d-flex flex-column">
      <div className="mh-33 d-flex flex-row flex-fill justify-content-center">
        <AnswerFields answers={answers} fieldsDisabled={fieldsDisabled} handleAnswer={handleAnswer} />

        {/* <AnswerField index="0" answers={answers} index={i} />
        <AnswerField index="1" disabled={fieldsDisabled} />
      </div>
      <div className="h-33 d-flex flex-row flex-fill justify-content-center answers-row">
        <AnswerField index="2" disabled={fieldsDisabled} />
        <AnswerField index="3" disabled={fieldsDisabled} />
        */}
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
              duration={countDownDuration}
              colors="#808080"
            />
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
