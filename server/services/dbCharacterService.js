const Character = require('../models/characterModel')

async function findCharacterById(characerID) {
    return await Character.CharacterModel.findOne({id: characerID},{_id: 0, __v: 0})
}

async function updateCharacterById(userID,character) {
    try {
        let result = await Character.CharacterModel.updateOne({id: userID},character,{upsert: true, runValidators: true})
        return result
    } catch(err) {
        return null
    }
}

module.exports = {findCharacterById, updateCharacterById}