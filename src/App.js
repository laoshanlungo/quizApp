import "./App.css";
import QuestionsPage from "./pages/layouts/QuestionsPage";
import GameRound from "./components/Game/GameRound";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import Preferences from "./components/Preferences/Preferences";
import Highscores from "./components/Statistics/Highscores";
import GameChoice from "./components/Game/CategoryChoice";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from "./components/hooks/useToken";
import questions from "./static/questions.json";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import img from './static/generic-background.jpg'

//TO DO Update Grid COMPLETELY with react-bootstrap
//TO DO Add in Websockets to make usage more dynamic (especially for multiplayer)

const App = () => {
  const { token, setToken } = useToken();
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setMerchants(data);
  };

  const logout = async () => {
    await setToken(null);
  };

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  
  return (
    <Container fluid className="vh-100">
      <BrowserRouter>
        <Row className="justify-content-between pt-3">
          <Col md="2">
            {" "}
            <Link to="/">
              <button className="button-back">Home</button>
            </Link>
          </Col>
          <Col xs={2}>
            <button className="button-back" disabled={false} onClick={logout}>
              Logout User
            </button>
          </Col>
        </Row>
        <Row className="h-100 align-items-center pb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gamechoice" element={<GameChoice />} />
            <Route path="/quizApp" element={<Dashboard />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route
              path="/questions"
              element={<QuestionsPage data={merchants} />}
            />
            <Route path="/play" element={<GameRound questions={merchants} />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/highscores" element={<Highscores />} />
          </Routes>
        </Row>
      </BrowserRouter>
      <Footer />
    </Container>
  );
};

export default App;
