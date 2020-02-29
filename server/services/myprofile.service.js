const mysql = require('mysql2');
const _ = require('lodash');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_db'
});

const fetchName = (req, res) => new Promise((resolve, reject) => {
    
      connection.query(
        'SELECT `first`,`last`,`username` FROM `users` WHERE `username`=?',[req.user.username], (err, rows, fields)=>{
          if(err) {
            return reject(err);
          }
          return resolve(rows);
        })
});

const fetchFolowedVacations= (req, res) => new Promise((resolve, reject) => {
  
  connection.query(
    'SELECT vacation.* FROM `vacation`, `vacations_users` WHERE vacation.id=vacations_users.vacation_id AND `delete_date` IS NULL and vacations_users.username=? ORDER BY vacation.update_date DESC',[req.user.username], (err, rows, fields)=>{
      if(err) {
        
        return reject(err);
      }
      return resolve(rows);
    })
});

const fetchPermissions = (req, res) => new Promise((resolve, reject) => {
    
      connection.query(
        'SELECT `admin` FROM `users` WHERE `username`=?',[req.user.username], (err, rows, fields)=>{
          if(err) {
            return reject(err);
          }
          return resolve(rows);
        })
});

const addToFavorites = (req, res) => new Promise((resolve, reject) => {
  const {username, idVacation} = req.body;
  connection.query('INSERT INTO `vacations_users`(`username`, `vacation_id`) VALUES (?,?)', [username, idVacation], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
})

const deleteFromFavorites = (req, res) => new Promise((resolve, reject) => {
  const {username, idVacation} = req.body;
  connection.query('DELETE FROM `vacations_users` WHERE `username`=? AND `vacation_id`=?', [username, idVacation], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
})

const createNewVacations= (req, res) => new Promise((resolve, reject) => {
  const {description, destination, start_date, end_date, price} = JSON.parse(req.body.vacationText);
  connection.query('INSERT INTO `vacation`(`description`, `destination`, `start_date`, `end_date`, `price`, `img`) VALUES (?, ?, ?, ?, ?, ?)', [description, destination, start_date, end_date, price, `/uploads/${req.files.vacatImg.name}`], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
});

const deleteVacation = (req, res) => new Promise((resolve, reject) => {
  const {idVacation} = req.body;
  connection.query('UPDATE `vacation` SET `delete_date`=CURRENT_TIMESTAMP WHERE `id`=?', [idVacation], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
});


const updateVacation = (req, res) => new Promise((resolve, reject) => {
  const {idVacation, destination, description, start_date, end_date, price} = JSON.parse(req.body.vacationText);
  connection.query('UPDATE `vacation` SET `update_date`=CURRENT_TIMESTAMP, `description`=?, `destination`=?, `start_date`=?, `end_date`=?, `price`=? WHERE `id`=?', [description, destination, start_date, end_date, price, idVacation], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
});

const updateImage = (req, res) => new Promise((resolve, reject) => {
  const {idVacation} = JSON.parse(req.body.vacationText);
  connection.query('UPDATE `vacation` SET `img`=? WHERE `id`=?', [ `/uploads/${req.files.vacatImg.name}`, idVacation], (err, rows, fields)=>{
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
});

const getDataForChart = (req, res) => new Promise((resolve, reject) => {
  connection.query('SELECT  vacation.destination FROM vacations_users INNER JOIN vacation ON vacations_users.vacation_id=vacation.id', (err,rows, fields) => {
    if(err) {
      return reject(err);
    }
    return resolve(rows);
  })
})

const fetchVacation = (req, res) => new Promise((resolve, reject) => {
  const {idVacation} = req.params;
    connection.query(
      'SELECT `description`, `id`, `destination`, `img`, `start_date`, `end_date`, `price` FROM `vacation` WHERE `id`=?',[idVacation], (err, rows, fields)=>{
        if(err) {
          return reject(err);
        }
        return resolve(rows);
      })
});

module.exports = {
    fetchName,
    fetchFolowedVacations,
    fetchPermissions,
    addToFavorites,
    deleteFromFavorites,
    createNewVacations,
    deleteVacation,
    updateVacation,
    getDataForChart,
    fetchVacation,
    updateImage
}