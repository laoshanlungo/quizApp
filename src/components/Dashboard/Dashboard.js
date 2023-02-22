import React from "react";
import { Link } from "react-router-dom";
import { Stack, Row } from 'react-bootstrap';

const Dashboard = () => {



  return (
    <Stack className="justify-content-center align-items-center" gap={4}>
      <Row><h1 className="text-center">Willkommen</h1></Row>
      <Row>
      <Link to="/questions">
        <button disabled className="menu-button-disabled">Questions</button>
      </Link>
      </Row>
      <Row>
      <Link to="/gamechoice">
        <button className="menu-button">Play</button>
      </Link>
      </Row>
      <Row>
      <Link to="/statistics">
        <button disabled className="menu-button-disabled">Statistics</button>
      </Link>
      </Row>
      <Row>
      <Link to="/highscores">
        <button disabled className="menu-button-disabled">Highscores</button>
      </Link>
      </Row>
    </Stack>
  );
}

export default Dashboard;
