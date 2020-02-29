const express =require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require('fs');
const { ensureAuthenticated} = require('../config/auth');

const myprofileService = require('../services/myprofile.service');

const vacationService = require('../services/vacations.services');


router.get('/',  ensureAuthenticated, async(req,res) => {
    
    try{
        const [user, folowedVacations, permissions, allVacations] = await Promise.all([myprofileService.fetchName(req,res), myprofileService.fetchFolowedVacations(req,res), myprofileService.fetchPermissions(req,res), vacationService.fetchVacations(req, res)]) 
        res.json({user, folowedVacations, permissions, allVacations});
    }
    catch(err){
        
        res.sendStatus(400)
    }
});

router.get('/authenticated',  ensureAuthenticated, (req,res) => {
    try{
        return res.sendStatus(200)
    }
    catch(e){
        return res.sendStatus(400)
    }
});


router.put('/follow', ensureAuthenticated, async(req,res)=>{
    try {
        await myprofileService.addToFavorites(req, res);
        return res.sendStatus(201)
    } catch (error) {
        
        res.sendStatus(400);
    }
})

router.patch('/unfollow', ensureAuthenticated, async(req,res)=>{
    try {
        await myprofileService.deleteFromFavorites(req, res);
        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400);
    }
})

router.post('/add-vacation', ensureAuthenticated, async(req,res)=>{
    try {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        const sampleFile = req.files.vacatImg;
        fs.writeFile(__dirname + '../../public/uploads/'+sampleFile.name, sampleFile.data, err=>{
            console.log(err)
        });
        await myprofileService.createNewVacations(req, res);
        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400);
    }
});


router.patch('/delete-vacation', ensureAuthenticated, async(req,res)=>{
    try {
        await myprofileService.deleteVacation(req, res);
        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400);
    }
})

router.get('/fetch-vacation/:idVacation', async(req,res)=>{
    try {
        const vacationToEdit = await myprofileService.fetchVacation(req, res);
        return res.status(200).json({vacationToEdit})
    } catch (error) {
        res.sendStatus(400);
    }
})

router.patch('/update-vacation', ensureAuthenticated, async(req,res)=>{
    try {
        if (!req.files) {
            console.log('No files were uploaded.')
        }else{
            const sampleFile = req.files.vacatImg;
            fs.writeFile(__dirname + '../../public/uploads/'+sampleFile.name, sampleFile.data, err=>{
                console.log(err)
            });
            await myprofileService.updateImage(req, res)
        }
        await myprofileService.updateVacation(req, res);
        return res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400);
    }
})



router.get('/chart', async(req, res) => {
    try {
        const sumOfFolowed = await myprofileService.getDataForChart(req, res);
        return res.json({sumOfFolowed})
    } catch (error) {
        res.sendStatus(400)
    }
})


module.exports = router;