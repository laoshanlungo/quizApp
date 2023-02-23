const pool = require('./database')


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

const getHighScores = async () => {
    const data = await pool.query(`SELECT * FROM scores_view;`);
    let highscores = data.rows;
    return highscores;
}
module.exports = {
  setScore,
  getHighScores
};
