const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'electronapp',
});

function getConetion() {
  return connection;
}

module.exports = {
  getConetion,
};
