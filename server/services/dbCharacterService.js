const Character = require('../models/characterModel')

async function findCharacterById(characerID) {
    return await Character.CharacterModel.findOne({id: characerID},{_id: 0, __v: 0})
}

async function updateCharacterById(userID,character) {
    let result =  Character.CharacterModel.updateOne({id: userID},character,{upsert: true, runValidators: true},callbackFunction)

    function callbackFunction(err,result) {
        if (err) {
            return err
        } else {
            return result
        }
    }
}

module.exports = {findCharacterById, updateCharacterById}