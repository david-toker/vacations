const express =require('express');
const router = express.Router();
const _ = require('lodash');

const registrService = require('../services/registr.services');
const registrValidation = require('../validations/registr.validations');

router.post('/',registrValidation.addUser, registrValidation.checkUserName, async(req,res)=>{
    try {
        const newUser = await registrService.addUser(req, res);
        res.json({newUser})
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});



module.exports = router;