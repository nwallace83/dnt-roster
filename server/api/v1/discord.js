var express = require('express')
const fetch = require('node-fetch')
var router = express.Router();
const { URLSearchParams } = require('url');
const User = require('../../models/userModel')

const jwt = require('jsonwebtoken')
const jwtKey = "nate_is_awesome"
const bcrypt = require('bcrypt')
const TEN_YEARS = 315360000000

const API_ENDPOINT = 'https://discord.com/api'
const CLIENT_ID = '944735010311786537'
const CLIENT_SECRET = ''
const REDIRECT_URI = 'http://localhost:3001'

router.post('/login/:code', async (req,res) => {
    let userToken = await fetchToken(req.params.code)
    let discordUser
    let discordUserGuilds

    if (userToken && userToken.access_token) {
        discordUser = await fetchDiscordUser(userToken)
    } else {
        res.status(401).send('Unable to validate user, yell at Kavion')
    }

    if (userToken && userToken.access_token && discordUser) {
        if (await userExistsInDB(discordUser)) {
            console.log('exists')
        } else {
            discordUserGuilds = await fetchDiscordUserGuilds(userToken)
            if (userIsInCompanyDiscord(discordUserGuilds)) {
                console.log('adding user: ' + discordUser.username + '#' + discordUser.discriminator)
                saveUserToDatabase(discordUser,userToken)
            } else {
                console.log('User '+ discordUser.username + '#' + discordUser.discriminator + ' attempted to login but is not in the company discord')
                res.status(401).send('Must be in Company discord to login')
            }
        }
        let jwtToken = getJWTToken(discordUser)
        res.json(jwtToken)
    } else {
        res.status(401).send()
    }
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

function saveUserToDatabase(discordUser,userToken) {
    new User.UserModel({
        id: discordUser.id,
        avatar: discordUser.avatar,
        id_admin: false,
        user_name: discordUser.username + '#' + discordUser.discriminator,
        token: {
            access_token: userToken.access_token,
            expires_at: (userToken.expires_in * 1000) + Date.now(),
            refresh_token: userToken.refresh_token,        
        }
    }).save()
}

async function userExistsInDB(discordUser) {
    let user = await User.UserModel.findOne({userName: discordUser.username + '#' + discordUser.discriminator})
    return user ? true : false
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