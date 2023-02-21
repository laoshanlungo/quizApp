import "./App.css";
import QuestionsPage from "./pages/layouts/QuestionsPage";
import GameRound from "./components/Game/GameRound";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import Preferences from "./components/Preferences/Preferences";
import Highscores from "./components/Statistics/Highscores";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from "./components/hooks/useToken";
import questions from "./static/questions.json";
import { Container } from "react-bootstrap";

const App = () => {
  const { token, setToken } = useToken();
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = async () => {
    // const res = await fetch("http://localhost:3001");
    // const data = await res.json();
    console.log("yolo")
    setMerchants(questions);
  };

  const logout = async () => {
    await setToken(null);
  };


  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }
  return (
    <Container>
            <div className="d-flex flex-row justify-content-between">
      <h1>Grundschule Fensterplatz</h1>
      <button className="button-logout" disabled={true} onClick={logout}>
        Logout User
      </button></div>
      <br />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/questions" element={<QuestionsPage data={merchants} />} />
          <Route path="/play" element={<GameRound questions={merchants} />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/highscores" element={<Highscores />} />
        </Routes>
        <div className="container">
    <div className="row">
    <div className="col align-self-center">
           <h1 className="text-center">Willkommen</h1>
            </div>

      <Link to="/dashboard">
        <button className="button-19">Dashboard</button>
      </Link>
    </div>
    </div>
      </BrowserRouter>
    </Container>
  );
};

export default App;
