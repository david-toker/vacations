const mysql = require('mysql2');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_db'
});


const addUser = (req, res) => new Promise((resolve, reject) => {
  const {first, last, username, password} = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
    connection.query(
        'insert into `users` (first, last, username, password) values (?, ?, ?, ?)', [first, last, username, hash], (err, rows, fields)=>{
          if(err) {
            return reject(err);
          }
            return resolve(rows);
        })
});

module.exports = {
    addUser
}