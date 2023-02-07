import React, {useEffect, useState} from "react";
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
    }
    useEffect(() => {
        statistics?.length && statistics.map((stat) => scores.push(stat.score));
    })

    if(loading){
        return <div>LOADING</div>
    }

  return (
    <div className="container">
    <div className="row">
    <div className="col align-self-center">
           <h1 className="text-center">Your Statistics</h1>
            </div>

        <p>Games played: {statistics.recordsCount}</p>

        <p>Average Score: {statistics.finalAverage}</p>

    </div>
    </div>
  );
}

export default Statistics;
