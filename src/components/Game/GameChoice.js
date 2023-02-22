import React from "react";
import { Link } from "react-router-dom";
import { Stack, Row, Col } from 'react-bootstrap';

const GameChoice = () => {



  return (
    <Row>
      <Col><h1 className="text-center">Wähle eine Kategorie</h1></Col>
      <Stack gap={3} className="align-items-center">
      <Col>
      <Link to={{pathname: "/play", hash:"#capitals"}}>
        <button className="button-30">Hauptstädte</button>
      </Link>
      </Col>
            <Col>
      <Link to={{pathname: "/play", hash:"#plants"}}>
        <button className="button-30">Pflanzen</button>
      </Link>
      </Col>
      <Col>
      <Link to={{pathname: "/play", hash:"#csgo"}}>
        <button className="button-30">CSGO</button>
      </Link>
      </Col>
      {/* <Col>
      <Link to={{pathname: "/play", hash:"#trivia"}}>
        <button disabled className="button-30">Unnützes Wissen</button>
      </Link>
      </Col> */}
      </Stack>
    </Row>
  );
}

export default GameChoice;
