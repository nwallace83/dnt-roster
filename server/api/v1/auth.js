var express = require('express')
var router = express.Router()
var tokenService = require('../../services/tokenService')
var dbUserService = require('../../services/dbUserService')

router.get('/',(req,res) => {
    if(!req.cookies.authorization) {
        return res.sendStatus(401)
    }

    let decodedWebToken = tokenService.decodeWebToken(req.cookies.authorization)

    if (!decodedWebToken) {
        return res.status(401).send("Invalid token")
    }

    let user = dbUserService.getUserById(decodedWebToken.id)

    if (!user) {
        return res.status(401).send("User not in database")
    }

    dbUserService.updateLastLoginById(decodedWebToken.id)

    res.sendStatus(200)
})

module.exports = router;