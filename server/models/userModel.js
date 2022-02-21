const db = require('../services/dbService')

const userSchema = db.mongoose.Schema({
    id: String,
    user_name: String,
    token: {
        access_token: String,
        expires_at: Number,
        refresh_token: String,        
    }
});

const User = db.mongoose.model("users",userSchema)

exports.userSchema = userSchema
exports.UserModel = User