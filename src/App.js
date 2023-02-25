import "./App.css";
import QuestionsPage from "./pages/layouts/QuestionsPage";
import GameRound from "./components/Game/GameRound";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import Preferences from "./components/Preferences/Preferences";
import Highscores from "./components/Statistics/Highscores";
import GameChoice from "./components/Game/GameChoice";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from "./components/hooks/useToken";
import questions from "./static/questions.json";
import { Container, Row, Col } from "react-bootstrap";


//TO DO Update Grid COMPLETELY with react-bootstrap


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
    <Container fluid className="vh-100 background">
            <Row className="justify-content-between pt-3">
      <Col xs={10}><h5>QuizApp@v0.01</h5></Col>
      <Col xs={2}><button className="button-89" disabled={false} onClick={logout}>
        Logout User
      </button></Col></Row>
      <Row className="h-100 align-items-center pb-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gamechoice" element={<GameChoice />} />
          <Route path="/quizApp" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/questions" element={<QuestionsPage data={merchants} />} />
          <Route path="/play" element={<GameRound questions={merchants} />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/highscores" element={<Highscores />} />
        </Routes>
      </BrowserRouter>
      </Row>
    </Container>
  );
};

export default App;
