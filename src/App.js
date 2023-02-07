import "./App.css";
import QuestionsPage from "./pages/layouts/QuizLayout";
import GameRound from "./components/Game/GameRound";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import Preferences from "./components/Preferences/Preferences";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from "./components/hooks/useToken";

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


  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="wrapper">
            <div className="d-flex flex-row justify-content-between">
      <h1>Grundschule Fensterplatz</h1>
      <button className="button-logout" onClick={logout}>
        Logout User
      </button></div>
      <br />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/questions" element={<QuestionsPage data={merchants} />} />
          <Route path="/play" element={<GameRound questions={merchants} />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
