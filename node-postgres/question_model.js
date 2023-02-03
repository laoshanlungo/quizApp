const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'davidmichel',
  password: 'root',
  port: 5432,
});

const getQuestions = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM questions ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createQuestion = (body) => {
    return new Promise(function(resolve, reject) {
      const { question, answers, solve } = body
      pool.query('INSERT INTO questions (question, answers, solve) VALUES ($1, $2, $3) RETURNING *', [question, answers, solve], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new question has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteQuestion = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM questions WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Question deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getQuestions,
    createQuestion,
    deleteQuestion,
  }