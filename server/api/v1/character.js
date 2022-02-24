var express = require('express')
var router = express.Router()
const tokenService = require('../../services/tokenService')
const dbUserService = require('../../services/dbUserService')
const dbCharacterService = require('../../services/dbCharacterService')

router.get('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.status(401).send("No authorization token provided")
    }

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization,res)

    if (!user || !user.id) {
        return res.sendStatus(401)
    }

    let character = await dbCharacterService.findCharacterById(user.id)

    if (character) {
        res.json(character)
    } else {
        res.json({})
    }
})

router.post('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.status(401).send("No authorization token provided")
    }

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization,res)

    let character = req.body

    let result = await dbCharacterService.updateCharacterById(user.id,character)

    if (result && (result.modifiedCount === 1 || result.upsertedCount === 1 || result.matchedCount === 1)) {
        res.sendStatus(200)
    } else {
        res.status(401).send("Unable to validate character")
    }
})

async function authenticateAndGetUserFromDB(authorization,res) {
    let decodedWebToken = tokenService.decodeWebToken(authorization)
    if (!decodedWebToken) {
        return res.status(401).send("Invalid authentication token")
    }

    let user = await dbUserService.getUserById(decodedWebToken.id)
    if (!user) {
        return res.status(401).send("User not in database")
    } else {
        return user
    }
}

module.exports = router;