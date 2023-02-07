import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Statistics = () => {
  const [statistics, setStatistics] = useState();
  const [loading, setLoading] = useState(true);
  const userString = localStorage.getItem("token");
  let scores = [];

  useEffect(() => {
    getStatistics();
  }, []);
  const getStatistics = async () => {
    const res = await fetch("http://localhost:3001/statistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userString }),
    });
    const data = await res.json();
    setStatistics(data);
    setLoading(false);
  };
  useEffect(() => {
    statistics?.length && statistics.map((stat) => scores.push(stat.score));
  });

  const ResultsList = () =>{
    return statistics.data.map((entry) => {
        return (
            <div>
            <p>ID of Score: {entry.id}, Number of questions in round: {entry.count}, Number of correct questions: {entry.score}</p>
            </div>
        )
    }) 
  }

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-row">
          <Link to="/">
            <button className="button-back">Back</button>
          </Link>
          <h1 className="text-center offset-md-3">Your Statistics</h1>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-center">
            <h3>Games played: {statistics.recordsCount}</h3>
          </div>{" "}
          <div className="d-flex flex-row justify-content-center">
            <h4>Average Score: {statistics.finalAverage}</h4>
          </div>
          <div className="d-flex flex-row justify-content-center">
          <div className="d-flex flex-column justify-content-center">
            <ResultsList />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
