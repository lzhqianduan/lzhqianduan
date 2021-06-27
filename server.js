const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const db = require('./config/keys').mongoURI
//引入users.js
const users = require('./routes/api/users')
//引入profile.js
const profiles = require('./routes/api/profiles')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profiles', profiles)
const port = 5000

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB 连接成功"))
    .catch(() => console.log("err"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))