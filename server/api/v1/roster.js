var express = require('express')
var router = express.Router()
const Character = require('../../models/characterModel')

router.get('/', async (req,res) => {
    let characters = await Character.CharacterModel.find();
    if (characters) {
        res.json(sanitizeCharacters(characters))
    } else {
        res.sendStatus(401)
    }

})

function sanitizeCharacters(characters) {
    let newCharacterArray = []
    for (i=0; i<characters.length; i++) {
        let sanitizedCharacter= {}

        sanitizedCharacter.characterName = characters[i].characterName ? characters[i].characterName : ""
        sanitizedCharacter.primaryRole = characters[i].primaryRole ? characters[i].primaryRole  : ""
        sanitizedCharacter.primaryArmor = characters[i].primaryArmor ? characters[i].primaryArmor  : ""
        sanitizedCharacter.primaryGS = characters[i].primaryGS ? characters[i].primaryGS  : "500"
        sanitizedCharacter.primaryWeapon1 = characters[i].primaryWeapon1 ? characters[i].primaryWeapon1 : ""
        sanitizedCharacter.primaryWeapon2 = characters[i].primaryWeapon2 ? characters[i].primaryWeapon2 : ""
        sanitizedCharacter.secondaryRole = characters[i].secondaryRole ? characters[i].secondaryRole : ""
        sanitizedCharacter.secondaryArmor = characters[i].secondaryArmor ? characters[i].secondaryArmor  : ""
        sanitizedCharacter.secondaryGS = characters[i].secondaryGS ? characters[i].secondaryGS  : "500"
        sanitizedCharacter.secondaryWeapon1 = characters[i].secondaryWeapon1 ? characters[i].secondaryWeapon1 : ""
        sanitizedCharacter.secondaryWeapon2 = characters[i].secondaryWeapon2 ? characters[i].secondaryWeapon2 : ""
        sanitizedCharacter.discordUserName = characters[i].discordUserName ? characters[i].discordUserName : ""

        newCharacterArray.push(sanitizedCharacter)
    }

    return newCharacterArray
}

module.exports = router;