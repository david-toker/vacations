const express =require('express');
const router = express.Router();
const _ = require('lodash');


router.get('/', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.sendStatus(400)
        }
        res.clearCookie('connect.sid');
        return res.json({message: "Logout"});
    })
})

module.exports = router;