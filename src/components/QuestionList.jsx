import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { Button } from 'react-bootstrap';

const QuestionList = () => {
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions();
  });

  function deleteQuestion(id) {
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

  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setQuestions(data);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading!!!</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-center">Overall Highscores</h1>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Question</th>
              <th scope="col">Answers</th>
              <th scope="col">Solve</th>
            </tr>
          </thead>
          <tbody>
            {questions
              .sort((a, b) => b.avg - a.avg)
              .map((row, index) => (
                <tr>
                  <th scope="col">{row.id}</th>
                  <th scope="col">{row.question}</th>
                  <th scope="col">
                    {row.multiplechoice === true
                      ? row.answers
                      : "This is not a multiple choice question"}
                  </th>
                  <th scope="col">
                    {row.multiplechoice === true
                      ? Number(row.solve) + 1
                      : row.solve}
                  </th>
                  <th scope="col">
                    <Button
                      onClick={async () => {
                        if (window.confirm(`Danach is die Frage weg, ne?`)) {
                          await deleteQuestion(row.id);
                        }
                      }}
                    >
                      <MdClear />
                    </Button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionList;
