const db = require('../services/dbService')

const characterSchema = db.mongoose.Schema({
    id: String,
    characterName: String,
    primaryWeapon1: String,
    primaryWeapon2: String,
    primaryRole: String,
    primaryArmor: String,
    primaryGS: String,
    secondaryWeapon1: String,
    secondaryWeapon2: String,
    secondaryRole: String,
    secondaryArmor: String,
    secondaryGS: String,
    discordUserName: String
});

const Character = db.mongoose.model("characters",characterSchema)

exports.characterSchema = characterSchema
exports.CharacterModel = Character