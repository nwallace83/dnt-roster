var express = require('express')
var router = express.Router()
const tokenService = require('../../services/tokenService')
const dbUserService = require('../../services/dbUserService')
const dbCharacterService = require('../../services/dbCharacterService')

const jwt = require('jsonwebtoken')

router.get('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.status(401).send("No authorization token provided")
    }

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization,res)

    let character = await dbCharacterService.findCharacterById(user.id)

    if (character) {
        let sanitizedCharacter = {}
        sanitizedCharacter.characterName = character.characterName ? character.characterName : ""
        sanitizedCharacter.primaryRole = character.primaryRole ? character.primaryRole : ""
        sanitizedCharacter.primaryArmor = character.primaryArmor ? character.primaryArmor : ""
        sanitizedCharacter.primaryGS = character.primaryGS ? character.primaryGS : "500"
        sanitizedCharacter.primaryWeapon1 = character.primaryWeapon1 ? character.primaryWeapon1 : ""
        sanitizedCharacter.primaryWeapon2 = character.primaryWeapon2 ? character.primaryWeapon2 : ""
        sanitizedCharacter.secondaryRole = character.secondaryRole ? character.secondaryRole : ""
        sanitizedCharacter.secondaryArmor = character.secondaryArmor ? character.secondaryArmor : ""
        sanitizedCharacter.secondaryGS = character.secondaryGS ? character.secondaryGS : "500"
        sanitizedCharacter.secondaryWeapon1 = character.secondaryWeapon1 ? character.secondaryWeapon1 : ""
        sanitizedCharacter.secondaryWeapon2 = character.secondaryWeapon2 ? character.secondaryWeapon2 : ""
        sanitizedCharacter.discordUserName = character.discordUserName ? character.discordUserName : ""
        res.json(sanitizedCharacter)
    } else {
        res.json({})
    }
})


router.post('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.status(401).send("No authorization token provided")
    }

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization,res)

    let payload = req.body

    let character = {}
    character.id = user.id
    character.characterName = payload.characterName ? payload.characterName : ""
    character.primaryRole = payload.primaryRole ? payload.primaryRole : ""
    character.primaryArmor = payload.primaryArmor ? payload.primaryArmor: ""
    character.primaryGS = payload.primaryGS ? payload.primaryGS: ""
    character.primaryWeapon1 = payload.primaryWeapon1 ? payload.primaryWeapon1 : ""
    character.primaryWeapon2 = payload.primaryWeapon2 ? payload.primaryWeapon2 : ""
    character.secondaryRole = payload.secondaryRole ? payload.secondaryRole : ""
    character.secondaryArmor = payload.secondaryArmor ? payload.primaryArmor: ""
    character.secondaryGS = payload.secondaryGS ? payload.secondaryGS: ""
    character.secondaryWeapon1 = payload.secondaryWeapon1 ? payload.secondaryWeapon1 : ""
    character.secondaryWeapon2 = payload.secondaryWeapon2 ? payload.secondaryWeapon2 : ""
    character.discordUserName = user.user_name ? user.user_name : ""

    let result = await dbCharacterService.updateCharacterById(user.id,character)

    if (result.modifiedCount === 1 || result.upsertedCount === 1 || result.matchedCount === 1) {
        res.sendStatus(200)
    } else {
        res.status(401).send("Unable to save character")
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