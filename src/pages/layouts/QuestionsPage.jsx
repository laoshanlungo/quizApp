import Card from "react-bootstrap/Card";
import mauritius from "../../static/mauritius.png";
import { QuestionCard } from "../../components/QuestionCards";
import { MultipleChoiceQuestionCard } from "../../components/QuestionCards";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import QuestionList from "../../components/QuestionList";

//TO DO: Add Picture Question Modals (multiple Choice and non multiple Choice) AND UPDATE RESOLVERS ACCORDINGLY

const QuestionsPage = ({ data }) => {
  const [questions, setQuestions] = useState();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    solve: null,
  });
  const [questionType, setQuestionType] = useState("textQuestion");
  const [answerType, setAnswerType] = useState("multipleChoice");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    createQuestion();
    setShow(false);
  };

  const BuildQuestionCard = ({ data }) => {
    return data.map((dataEntry) => {
      console.log(dataEntry, "eintrag");
      if (dataEntry.multiplechoice === false) {
        console.log(dataEntry.multiplechoice === false, "ist es falsch?");
        console.log("und trotzdem sind wir hier");
        return (
          <QuestionCard
            question={dataEntry.question}
            solve={dataEntry.solve}
            picture={mauritius}
          />
        );
      } else {
        return (
          <MultipleChoiceQuestionCard
            question={dataEntry.question}
            solve={dataEntry.solve}
            answers={dataEntry.answers}
            picture={mauritius}
          />
        );
      }
    });
  };

  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setQuestions(data);
  };

  function createQuestion() {
    const question = formData.question;
    const answers = [
      formData.answer1,
      formData.answer2,
      formData.answer3,
      formData.answer4,
    ];
    const solve = formData.solve;
    const multiplechoice = answerType === "multipleChoice";
    fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answers, solve, multiplechoice }),
    })
      .catch((error) => {
        return error;
      })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getQuestions();
      });
  }
  function deleteQuestion() {
    let id = prompt("Enter merchant id");
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getQuestions();
      });
  }

  const BuildPictureCard = ({ picture }) => {
    return (
      <Card className="align-items-center" style={{ width: "36rem" }}>
        <Card.Body>
          <img src={picture} alt="Logo" />
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-start">
        <Link to="/">
          <button className="button-back">Back</button>
        </Link>
        <h1 className="text-center offset-md-3">
          Add, Delete and check questions
        </h1>
      </div>
      <br />
      <br />
      <br />
      <button className="button-19" onClick={handleShow}>
        Add Question
      </button>
      <br />
      <button className="button-19" onClick={deleteQuestion}>
        Delete Question by ID
      </button>

      <div className="container-fluid" style={{ height: "800px" }}>
        <div className="h-75 d-flex flex-row d-flex justify-content-around col-md-auto">
          <div className="d-flex flex-column">

          <div className="h-100 col-sm align-items-center justify-content-around">
            <QuestionList data={data} />
          </div>
          </div>
        </div>
        {/* <BuildPictureCard className="h-25" picture={mauritius} /> */}
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <div className="d-flex flex-column">
            <Nav
              variant="pills"
              defaultActiveKey="textQuestion"
              onSelect={(selectedKey) => setQuestionType(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="textQuestion">Text Question</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pictureQuestion" disabled>
                  Picture Question
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Modal.Header>
        <Modal.Header>
          <div>
            <Nav
              variant="pills"
              defaultActiveKey="multipleChoice"
              onSelect={(selectedKey) => setAnswerType(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="multipleChoice">Multiple Choice</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="notMultipleChoice">
                  Not Multiple Choice
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Modal.Header>
        {questionType === "textQuestion" ? (
          answerType === "multipleChoice" ? (
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Warum ist die Banane krumm?"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Antwort 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Weil niemand in den Dschungel zog und die Banane grade bog."
                    value={formData.answer1}
                    onChange={(e) =>
                      setFormData({ ...formData, answer1: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Antwort 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Weil sie vom Baum fiel und schepp wurde."
                    value={formData.answer2}
                    onChange={(e) =>
                      setFormData({ ...formData, answer2: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Antwort 3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Weil sie sich vom Bierschinken optisch abgrenzen wollte."
                    value={formData.answer3}
                    onChange={(e) =>
                      setFormData({ ...formData, answer3: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label>Antwort 4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Weil die Affen dran ziehen."
                    value={formData.answer4}
                    onChange={(e) =>
                      setFormData({ ...formData, answer4: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput6"
                >
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setFormData({ ...formData, solve: e.target.value })
                    }
                  >
                    <option>Welche Antwort ist die richtige?</option>
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Warum ist die Banane krumm?"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Abu Dhabi"
                    value={formData.solve}
                    onChange={(e) =>
                      setFormData({ ...formData, solve: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          )
        ) : answerType === "multipleChoice" ? (
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Question MULTIPLE</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Warum ist die Banane krumm?"
                  autoFocus
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Question NOT MULTIPLE</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Warum ist die Banane krumm?"
                  autoFocus
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuestionsPage;
