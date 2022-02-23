const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY

const THIRTY_DAYS = 604800000

function decodeWebToken(token) {
    try {
        let decodedWebToken = jwt.verify(token,jwtKey)
        return decodedWebToken
    } catch {
        return null
    }
}

function getJWTToken(discordUser){
    return jwt.sign({userName: discordUser.username + '#' + discordUser.discriminator,
            id: discordUser.id,
            avatar: discordUser.avatar,
            is_admin: false,
            expiresAt: Date.now() + THIRTY_DAYS},
                jwtKey,{algorithm: "HS256",
                expiresIn: THIRTY_DAYS})
}

module.exports = {decodeWebToken, getJWTToken}