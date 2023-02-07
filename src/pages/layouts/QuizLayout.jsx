import Card from "react-bootstrap/Card";
import mauritius from '../../static/mauritius.png';
import QuestionCard from '../../components/QuestionCard';
import { Link } from 'react-router-dom';
import { useState } from 'react';




const QuestionsPage = ({data}) => {
  const [questions, setQuestions] = useState();

  const BuildQuestionCard = ({ data }) => {
    return data.map((dataEntry) => {
      return(
      <QuestionCard question={dataEntry.question} answers={dataEntry.answers} solve={dataEntry.solve} picture={mauritius} />
      )
    })
  }

  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setQuestions(data);
  };

  function createQuestion() {
    let question = prompt("Enter questions");
    let answer1 = prompt("Enter answer 1");
    let answer2 = prompt("Enter answer 2");
    let answer3 = prompt("Enter answer 3");
    let answer4 = prompt("Enter answer 4");
    let solve = prompt("Enter merchant email");
    const answers = [answer1, answer2, answer3, answer4];
    fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answers, solve }),
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
    return(
      <Card className="align-items-center" style={{ width: "36rem" }}>
      <Card.Body>
      <img src={picture} alt="Logo" />
      </Card.Body>
    </Card>
    )
  }

  return (
    <div>
            <h1>Here you can delete, add and view all questions</h1>
          <Link to='/'><button className="button-19">Back to start</button></Link>
            <button className="button-19" onClick={createQuestion}>
        Add Question
      </button>
      <br />
      <button className="button-19" onClick={deleteQuestion}>
        Delete Question by ID
      </button>


    <div className="container-fluid" style={{height: "800px"}}>
      
    <div className="h-75 d-flex flex-row d-flex justify-content-around col-md-auto">
      {/* <div className="h-100 col-sm align-items-center justify-content-around">
      <BuildQuestionCard data={data}/>
      </div> */}
    </div>
    {/* <BuildPictureCard className="h-25" picture={mauritius} /> */}
    </div>
    </div>
  );
};

export default QuestionsPage;
