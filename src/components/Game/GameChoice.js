import React from "react";
import { Link } from "react-router-dom";
import { Stack, Row, Col } from 'react-bootstrap';

const GameChoice = () => {



  return (
    <Row>
      <Col><h1 className="text-center">Wähle eine Kategorie</h1></Col>
      <Stack gap={3} className="justify-content-center align-items-center"> 
      <div className="card-shadow shadow">
      <Col>
      <Link to={{pathname: "/play", hash:"#capitals"}}>
        <button className="dashboard-button">Hauptstädte</button>
      </Link>
      </Col>
            <Col>
      <Link to={{pathname: "/play", hash:"#plants"}}>
        <button className="dashboard-button">Pflanzen</button>
      </Link>
      </Col>
      <Col>
      <Link to={{pathname: "/play", hash:"#csgo"}}>
        <button className="dashboard-button">CSGO</button>
      </Link>
      </Col>
      {/* <Col>
      <Link to={{pathname: "/play", hash:"#trivia"}}>
        <button disabled className="button-30">Unnützes Wissen</button>
      </Link>
      </Col> */}
      </div>
      </Stack>
    </Row>
  );
}

export default GameChoice;
