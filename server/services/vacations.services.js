const mysql = require('mysql2');
const _ = require('lodash');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_db'
});

const fetchVacations = (req, res) => new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM `vacation` WHERE `delete_date` IS NULL ORDER BY `update_date` DESC', (err, rows, fields)=>{
        if(err) {
          return reject(err);
        }
        req.vacations = rows;
        return resolve(rows);
      })
  });

module.exports = {
    fetchVacations
}