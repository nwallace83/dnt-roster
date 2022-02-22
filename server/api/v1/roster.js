var express = require('express')
var router = express.Router()
const Character = require('../../models/characterModel')

router.get('/', async (req,res) => {
    let characters = await Character.CharacterModel.find();
    console.log(characters)

})

module.exports = router;