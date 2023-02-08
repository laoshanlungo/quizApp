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

      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">Place</th>
      <th scope="col">Email</th>
      <th scope="col">Avg. Score</th>
    </tr>
  </thead>
        <tbody>
          {highscores.sort((a,b) => b.avg - a.avg).map((row, index) => (
            <tr><th scope="col">
              {index+1}
              </th>
              <th scope="col">
             {row.email}
              </th>
              <th scope="col">
                <p>{Math.round(row.avg*100)/100*10}/10</p>
              </th>

            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default Highscore;
