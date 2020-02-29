const express =require('express');
const router = express.Router();
const _ = require('lodash');
const passport = require('passport');

const loginValidations = require('../validations/login.validations');


router.post('/',loginValidations.emptyFields, passport.authenticate('local'),
function(req, res) {
  res.send(req.user);
});


module.exports = router;