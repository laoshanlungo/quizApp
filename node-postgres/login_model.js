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
    const {email, password} = credentials;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);
    const user = data.rows;
    if (user.length === 0) {
        return 'noUser';
    } else {
        return password === user[0].password ? 'success' : 'failure';
    }
  } catch (err) {
    console.log(err);
    return 'error';
  }
};

module.exports = {
  getLogin,
};
