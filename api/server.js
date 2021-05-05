const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./DB.js')
const registrationRoutes = require('./route')
const Seats = require('./Seats')
mongoose.Promise = global.Promise
mongoose
  .connect(config.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('Database is connected')
    },
    err => {
      console.log('Can not connect to the database' + err)
    }
  )

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/user', registrationRoutes)
app.use('/seats', Seats)

module.exports = app
