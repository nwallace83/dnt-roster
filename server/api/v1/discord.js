var express = require('express')
const fetch = require('node-fetch')
var router = express.Router();
const { URLSearchParams } = require('url');
const User = require('../../models/userModel')

const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY
const TEN_YEARS = 315360000000

const API_ENDPOINT = 'https://discord.com/api'
const CLIENT_ID = '944735010311786537'
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

router.post('/login/:code', async (req,res) => {
    console.info('Fetching token for code: ' + req.params.code)
    let userToken = await fetchToken(req.params.code)
    let discordUser
    let discordUserGuilds

    if (!userToken || !userToken.access_token) {
        console.error('Unable to get token for code: ' + req.params.code)
        return res.status(401).send('Unable to get token from code provided')
    }

    discordUser = await fetchDiscordUser(userToken)

    if (!discordUser || !discordUser.username || !discordUser.discriminator) {
        console.error('unable to get discord user from token: ' + userToken.access_token)
        return res.status(401).send('unable to get discord user from token provided')
    }

    let discordProfileName = discordUser.username + '#' + discordUser.discriminator

    console.info('fetching guilds for ' + discordProfileName)
    discordUserGuilds = await fetchDiscordUserGuilds(userToken)

    if (userIsInCompanyDiscord(discordUserGuilds)) {
        console.info('upserting user: ' + discordProfileName)
        saveUserToDatabase(discordUser,userToken)
    } else {
        console.info('User '+ discordProfileName + ' attempted to login but is not in the company discord')
        return res.status(401).send('Must be in Company discord to login')
    }

    let jwtToken = getJWTToken(discordUser,userToken)
    res.json(jwtToken)
})

function getJWTToken(discordUser){
    return jwt.sign({userName: discordUser.username + '#' + discordUser.discriminator,
            id: discordUser.id,
            avatar: discordUser.avatar,
            is_admin: false,
            expiresAt: Date.now() + TEN_YEARS},
                jwtKey,{algorithm: "HS256",
                expiresIn: TEN_YEARS})
}

function userIsInCompanyDiscord(userGuilds) {
    for (let i=0; i<userGuilds.length; i++) {
        if (userGuilds[i].id == '550866967200792577') {
            return true
        }
    }
    return false;
}

async function saveUserToDatabase(discordUser,userToken) {
    let userToUpdate = {
        id: discordUser.id,
        avatar: discordUser.avatar,
        id_admin: false,
        user_name: discordUser.username + '#' + discordUser.discriminator,
        token: {
            access_token: userToken.access_token,
            expires_at: (userToken.expires_in * 1000) + Date.now(),
            refresh_token: userToken.refresh_token
        }
    }

    await User.UserModel.updateOne({id:discordUser.id},userToUpdate,{upsert: true})
}

async function fetchToken(code){
    const params = new URLSearchParams()
    params.append('grant_type','authorization_code')
    params.append('client_id',CLIENT_ID)
    params.append('client_secret',CLIENT_SECRET)
    params.append('code',code)
    params.append('redirect_uri',REDIRECT_URI)

    const data = {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }
    }

    let userToken = await fetch(API_ENDPOINT + '/oauth2/token',data)

    if (userToken.ok) {
        userToken = await userToken.json()
        return userToken;
    } else {
        return null;
    }
}

async function fetchDiscordUser(token) {
    const data = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token.access_token}
    }

    let userDetails = await fetch(API_ENDPOINT + '/users/@me',data)

    if (userDetails.ok) {
        userDetails = await userDetails.json()
        return userDetails
    }
}

async function fetchDiscordUserGuilds(userToken) {
    const data = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + userToken.access_token}
    }

    let DiscordUserGuilds = await fetch(API_ENDPOINT + '/users/@me/guilds',data)

    if (DiscordUserGuilds.ok) {
        userDetails = await DiscordUserGuilds.json()
        return userDetails
    }
}

module.exports = router;