import React from "react";
import { Link } from "react-router-dom";
import { Stack, Row, Card } from 'react-bootstrap';
import "../../styles.css";

const Dashboard = () => {



  return (

    <Stack className="justify-content-center align-items-center" gap={4}>
          <div className="card-shadow shadow">
 <Row>
      <Link to="/questions">
        <button disabled className="dashboard-button">Questions</button>
      </Link>
      </Row>
      <Row>
      <Link to="/gamechoice">
        <button className="dashboard-button">Play</button>
      </Link>
      </Row>
      <Row>
      <Link to="/statistics">
        <button disabled className="dashboard-button">Statistics</button>
      </Link>
      </Row>
      <Row>
      <Link to="/highscores">
        <button disabled className="dashboard-button">Highscores</button>
      </Link>
      </Row>
      </div>
    </Stack>

  );
}

export default Dashboard;
