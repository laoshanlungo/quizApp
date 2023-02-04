const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "davidmichel",
  password: "root",
  port: 5432,
});

const getLogin = async (credentials, res) => {
  const { email, password } = credentials;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);
    const user = data.rows;
    if (user.length === 0) {
      return "noUser";
    } else {
      return password === user[0].password ? "success" : "failure";
    }
  } catch (err) {
    console.log(err);
    return "error";
  }
};

const signupUser = async (credentials, res) => {
  const { signupName, signupEmail, signupPassword } = credentials;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      signupEmail,
    ]);
    const user = data.rows;
    console.log(user, "userInModel");
    if (user.length !== 0) {
      return 'userAlreadyExists';
    } else {
      await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [signupName, signupEmail, signupPassword]
      );
      return "success";
    }
  } catch (err) {
    console.log(err);
    return "error";
  }
};

module.exports = {
  getLogin,
  signupUser,
};
