const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "davidmichel",
  password: "root",
  port: 5432,
});

const getStatistics = async (input, res) => {
  const { updatedUserString } = input;
  const scores=[];
  let aggregatedScore = 0;
  let finalAverage;

  const user = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
    updatedUserString,
  ]);
  const score = await pool.query(`SELECT * FROM scores WHERE user_id= $1`, [
    user.rows[0].id
  ])
  let data = score.rows;
  score.rows.map((row) => scores.push(row.score));
  score.rows.map((row) => aggregatedScore += (row.score/row.count));
  finalAverage = aggregatedScore/data.length;
  let recordsCount = data.length;
  return {data, scores, recordsCount, finalAverage};
};

module.exports = {
  getStatistics,
};
