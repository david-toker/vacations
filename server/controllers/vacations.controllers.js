const express =require('express');
const router = express.Router();
const _ = require('lodash');

const vacationService = require('../services/vacations.services');

router.use(async(req, res, next)=>{
    try {
        await vacationService.fetchVacations(req, res);
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.get('/', (req, res)=>res.json({vacations: req.vacations}));

module.exports = router;