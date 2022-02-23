var express = require('express')
var router = express.Router()
const Character = require('../../models/characterModel')
const User  = require('../../models/userModel')
const jwtKey = process.env.JWT_KEY

const jwt = require('jsonwebtoken')

router.get('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.status(401).send("No authorization token provided")
    }

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization)

    if (!user || !user.id) {
        return res.sendStatus(401)
    }

    let character = await Character.CharacterModel.findOne({id:user.id})

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

    let user = await authenticateAndGetUserFromDB(req.cookies.authorization)
    if (!user || !user.id) {
        return res.status(401).send("unable to get user from database")
    }

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

    let result = await Character.CharacterModel.updateOne({id:user.id},character,{upsert: true})

    if (result) {
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

async function authenticateAndGetUserFromDB(authorization) {
    let decodedWebToken

    try {
        decodedWebToken = jwt.verify(authorization,jwtKey)
    } catch {
        return null
    }
    
    let user = await User.UserModel.findOne({id:decodedWebToken.id})
    if (user) {
        return user
    } else {
        return null
    }
}

module.exports = router;