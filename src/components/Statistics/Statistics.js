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

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-row justify-content-start">
          <Link to="/">
            <button className="button-19">Back</button>
          </Link>
          <h1 className="text-center offset-md-4">Your Statistics</h1>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-center">
            <p>Games played: {statistics.recordsCount}</p>
          </div>{" "}
          <div className="d-flex flex-row justify-content-center">
            <p>Average Score: {statistics.finalAverage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
