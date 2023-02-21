import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {



  return (
    <div className="container">
    <div className="row">
    <div className="col align-self-center">
           <h1 className="text-center">Willkommen</h1>
            </div>

      <Link to="/questions">
        <button disabled className="button-19-disabled">Questions</button>
      </Link>
      <Link to="/play">
        <button className="button-19">Play</button>
      </Link>
      <Link to="/statistics">
        <button disabled className="button-19-disabled">Statistics</button>
      </Link>
      <Link to="/highscores">
        <button disabled className="button-19-disabled">Highscores</button>
      </Link>
    </div>
    </div>
  );
}

export default Dashboard;
