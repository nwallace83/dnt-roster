const express = require('express');
const app = express();
const path = require('path')
const cookieParser = require("cookie-parser")

// app.use(express.json())
app.use(cookieParser())

var discord = require('./api/v1/discord')
var auth = require('./api/v1/auth')
var character = require('./api/v1/character')


app.use('/api/v1/discord',discord)
app.use('/api/v1/auth',auth)
app.use('/api/v1/character',character)


app.use('/',express.static(path.join(__dirname, 'html')))

app.listen(3001);