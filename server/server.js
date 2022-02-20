const express = require('express');
const app = express();
const path = require('path')
// const cookieParser = require("cookie-parser")

// app.use(express.json())
// app.use(cookieParser())

var discord = require('./api/v1/discord')
// var players = require('./routes/players')
// var auth = require('./routes/auth')
// var admin = require('./routes/admin')

app.use('/api/v1/discord',discord)
// app.use('/api/players',players)
// app.use('/auth',auth)
// app.use('/admin',admin)

app.use('/',express.static(path.join(__dirname, 'html')))

app.listen(3001);