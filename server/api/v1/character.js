var express = require('express')
const fetch = require('node-fetch')
var router = express.Router();
const Character = require('../../models/characterModel')
const User  = require('../../models/userModel')
const jwtKey = "nate_is_awesome"

const jwt = require('jsonwebtoken')

router.get('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.sendStatus(401)
    }

    let decodedWebToken
    try {
        decodedWebToken= jwt.verify(req.cookies.authorization,jwtKey)
    } catch {
        return res.sendStatus(401)
    }
    
    let user = await User.UserModel.findOne({id:decodedWebToken.id})
    if (!user) {
        return sendStatus(401)
    }

    let character = await Character.CharacterModel.findOne({id:decodedWebToken.id})
    if (character) {
        res.json(character)
    } else {
        res.json({})
    }
})

router.post('/', async (req,res) => {
    if(!req.cookies.authorization) {
        return res.sendStatus(401)
    }

    let decryptedWebToken= jwt.verify(req.cookies.authorization,jwtKey)
    
    console.log(decryptedWebToken)
})

module.exports = router;