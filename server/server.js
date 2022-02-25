const express = require('express')
const app = express();
const path = require('path')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const helmet = require('helmet')

if (!process.env.CLIENT_SECRET || !process.env.REDIRECT_URI || !process.env.JWT_KEY) {
    console.error('Missing environmental variable verify they exist: ')
    process.env.CLIENT_SECRET ?  console.log('CLIENT_SECRET: Found') : console.log('CLIENT_SECRET: missing')
    process.env.REDIRECT_URI ?  console.log('REDIRECT_URI: Found') : console.log('REDIRECT_URI: missing')
    process.env.JWT_KEY ?  console.log('JWT_KEY: Found') : console.log('JWT_KEY: missing')
    console.error('CLIENT_SECRET, REDIRECT_URI, JWT_KEY')
    process.exit(1)
}

app.use(cookieParser())
app.use(bodyParser.json())
app.use(helmet({crossOriginEmbedderPolicy: false}))

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "img-src": ["'self'","*.discordapp.com","data:"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production" ? null : [true]
      },
    })
); 

var discord = require('./api/v1/discord')
var auth = require('./api/v1/auth')
var character = require('./api/v1/character')
var roster = require('./api/v1/roster');

app.use('/api/v1/discord',discord)
app.use('/api/v1/auth',auth)
app.use('/api/v1/character',character)
app.use('/api/v1/roster',roster)

app.use('/',express.static(path.join(__dirname, 'html')))

if (process.env.NODE_ENV === "production") {
const https = require('https')
const fs = require('fs')
const privateKey = fs.readFileSync("dntroster.com.key")
const certicate = fs.readFileSync("dntroster.com_2022.crt")
const credentials = {key: privateKey, cert: certicate}

const httpsServer = https.createServer(credentials, app)
httpsServer.listen(8443)
}

const http = require('http')
const httpServer = http.createServer(app)
httpServer.listen(3001)