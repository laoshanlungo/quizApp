import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Highscore = () => {
    const [loading, setLoading] = useState(true);
    const [highscores, setHighscores] = useState();


    useEffect(() => {
        getHighscores();
      }, []);
    const getHighscores = async () => {

        const res = await fetch("http://localhost:3001/highscores");
        const data = await res.json();
        setHighscores(data)
        setLoading(false);
      };


      const HighscoresList = () =>{
        return highscores.map((entry) => {
            return (
                <div>
                <p>Player with the email of: {entry.email} has the score: {entry.avg}</p>
                </div>
            )
        }) 
      }

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <div className="container">
      <div className="row">
      <div className="d-flex flex-row">
          <Link to="/">
            <button className="button-back">Back</button>
          </Link>
          <h1 className="text-center offset-md-3">Overall Highscores</h1>
       
        </div>
        <div className="d-flex flex-column justify-content-center text-center">
            <HighscoresList />
          </div>
      </div>
    </div>
  );
};

export default Highscore;
