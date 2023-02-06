import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return(
    <div>
    <Link to="/questions">
    <button className="button-19">Questions</button>
  </Link>
      <Link to="/play">
    <button className="button-19">Play</button>
  </Link>
  </div>
  );
}
