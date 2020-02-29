const express =require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./config/passport')(passport);
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:false}));

app.use(cookieParser());


app.use(express.static('../client/build'));
app.use(fileUpload());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);



app.use(passport.initialize());
app.use(passport.session());

const vacationController = require('./controllers/vacations.controllers');

const registrController = require('./controllers/registr.controllers');

const loginController = require('./controllers/login.controllers');

const profileController = require('./controllers/myprofile.controllers');

const logoutController = require('./controllers/logout.controllers')

// app.use(fileUpload());

app.use('/myprofile', profileController);

app.use('/login', loginController);

app.use('/vacations', vacationController);

app.use('/registration', registrController);

app.use('/logout', logoutController)

app.use(express.static('public'));

// app.use(express.static('../client/my-app/build'));


app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



app.listen(4005,() => {
    console.log('Server Up! PORT 4005')
  })