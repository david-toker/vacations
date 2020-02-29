const mysql = require('mysql2');
const _ = require('lodash');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_db'
});

const addUser = (req, res, next) => {
    const {first, last, username, password} = req.body;
    if (!first || !last || !username || !password) {
        return res.status(400).json({message: "complete all fields"});
    }
    return next()
}

const checkUserName = (req, res, next) => {
    const {username} = req.body;
    let checkQuery = 'SELECT COUNT(1) AS isExist FROM `users` WHERE `username` = ?';
connection.query(checkQuery,[username], (err, rows, fields)=>{
    if(err) {
        return res.sendStatus(400);
    }
        if(rows[0].isExist===0){
            return next();
        }
        return res.status(400).json({message: "this user already exist"});
    })
};

module.exports = {
    addUser,
    checkUserName
}