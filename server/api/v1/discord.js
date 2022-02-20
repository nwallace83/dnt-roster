var express = require('express')
const fetch = require('node-fetch')
var router = express.Router();
const { URLSearchParams } = require('url');

router.post('/:code', async (req,res) => {
    console.log(req.params.code)
    await fetchToken(req.params.code)
})

async function fetchToken(code){
    const API_ENDPOINT = 'https://discord.com/api/oauth2/token'
    const CLIENT_ID = '944735010311786537'
    const CLIENT_SECRET = 'SECRET'
    const REDIRECT_URI = 'http://localhost:3001'

    const params = new URLSearchParams();
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

    fetch(API_ENDPOINT,data).then( res => res.json()).then(res => console.log(res)).catch(err => console.log('error: ' + err))
}

module.exports = router;