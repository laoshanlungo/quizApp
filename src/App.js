import logo from "./logo.svg";
import "./App.css";
import QuizLayout from "./pages/layouts/QuizLayout";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import useToken from './components/hooks/useToken';


const App = () => {
  const  { token, setToken } = useToken();
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = async () => {
    const res = await fetch("http://localhost:3001");
    const data = await res.json();
    setMerchants(data);
  };
  function createQuestion() {
    let question = prompt("Enter questions");
    let answer1 = prompt("Enter answer 1");
    let answer2 = prompt("Enter answer 2");
    let answer3 = prompt("Enter answer 3");
    let answer4 = prompt("Enter answer 4");
    let solve = prompt("Enter merchant email");
    const answers = [answer1, answer2, answer3, answer4];
    fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answers, solve }),
    })
      .catch((error) => {
        console.log("fetch error:", error);
      })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getQuestions();
      });
  }
  function deleteQuestion() {
    let id = prompt("Enter merchant id");
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getQuestions();
      });
  }

  const logout = async() => {
    await setToken(null);
  }


  // TODO: use logic from here to build Error on Login if password wrong / user don't exist
  // const checkLogin = async() => {
  //   const test = 'test';
  //   const res = await fetch("http://localhost:3001/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ test }),
  //   })
  //   const data = await res.json();
  //   if(!res){
  //     setLoginError(res === '1' ? 'No User with email found' : 'Wrong password');
  //     return;
  //   }
  //   setLoginSuccess(true);
  // }


  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <button onClick={createQuestion}>Add merchant</button>
      <br />
      <button onClick={deleteQuestion}>Delete merchant</button>
      
      <QuizLayout data={merchants} />
    </div>
  );
};

export default App;
