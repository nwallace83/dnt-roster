var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
const jwtKey = "nate_is_awesome"

router.get('/',(req,res) => {
    if(!req.cookies.authorization) {
        res.sendStatus(401)
    }

    try {
        jwt.verify(req.cookies.authorization, jwtKey)
        res.sendStatus(200)
    } catch{
        console.log("Bad Auth Token " + req.cookies.authorization)
        res.sendStatus(401)
    }
})

module.exports = router;