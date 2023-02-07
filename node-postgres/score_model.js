const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "davidmichel",
  password: "root",
  port: 5432,
});

const setScore = async (input, res) => {
  const { numberOfQuestionsPerRound, score, updatedUserString } = input;

  const user = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
    updatedUserString,
  ]);
  let data = user.rows[0];
  try {
    await pool.query(
      `INSERT INTO scores (count, score, percentage, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        numberOfQuestionsPerRound,
        score,
        score / numberOfQuestionsPerRound,
        data.id,
      ]
    );
  } catch (err) {
    console.log(err);
    return "error";
  }
};

module.exports = {
  setScore,
};
