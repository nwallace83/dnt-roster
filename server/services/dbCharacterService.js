const Character = require('../models/characterModel')

async function findCharacterById(characerID) {
    return await Character.CharacterModel.findOne({id: characerID})
}

async function updateCharacterById(userID,character) {
    return await Character.CharacterModel.updateOne({id: userID},character,{upsert: true})
}

module.exports = {findCharacterById, updateCharacterById}