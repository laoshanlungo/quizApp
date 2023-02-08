import React from "react";
import { Link } from "react-router-dom";

const QuestionList = ({data}) => {
    console.log(data, "daten")
    return(
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
<th scope="col">ID</th>
<th scope="col">Question</th>
<th scope="col">Answers</th>
<th scope="col">Solve</th>
</tr>
</thead>
  <tbody>
    {data.sort((a,b) => b.avg - a.avg).map((row, index) => (
      <tr><th scope="col">
        {row.id}
        </th>
        <th scope="col">
       {row.question}
        </th>
        <th scope="col">
          {row.multiplechoice === true ? row.answers : 'This is not a multiple choice question'}
        </th>
        <th scope="col">
          {row.multiplechoice === true ? Number(row.solve)+1 : row.solve}
        </th>

      </tr>
    ))}
  </tbody>
</table>

</div>
</div>
    )
}

export default QuestionList;
