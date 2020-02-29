const mysql = require('mysql2');
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'project_db'
});


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query('select * FROM users WHERE id = ?', [id], function(err, rows){
            done(err, rows[0])
        })
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
     connection.query('SELECT * FROM users WHERE username=?', [username], function(err, rows){
         if (err) {
             return done(err);
         }
         if (!rows.length) {
             return done(null, false, { message: 'No user found' })
         }
         if (!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false, { message: 'Wrong Password' })
         }
         return done(null, rows[0]);
     })   
    }
    ))
}