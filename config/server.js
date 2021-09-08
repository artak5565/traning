const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const passportMiddleware = require('../middleware/passport')


module.exports = (app) => {
  app.use(morgan('dev'))
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(passport.initialize())
  passportMiddleware(passport);
  app.use(express.static('public'));
}