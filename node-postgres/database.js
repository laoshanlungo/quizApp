const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const connectionString = process.env.DB_URL;
const pool = new Pool({connectionString});


module.exports = pool;

// const Client = require("pg").Client;
// const bcrypt = require("bcrypt");
// const client = new Client();
// client.connect();

// module.exports = client;

