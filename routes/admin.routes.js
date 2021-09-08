const router  = require('express').Router()
const authController = require('../controllers/auth.controller')
const {check} = require('express-validator')
const passport = require('passport')

router.post('/auth/login',
  [
    check('username', 'is required').notEmpty(),
    check('password', 'is required').notEmpty(),
  ],
  authController.login
)

router.post('/auth/change-password',
  [
    check('current', 'is required').notEmpty(),
    check('new', 'is required').notEmpty(),
    check('confirm', 'is required').notEmpty(),
  ],
  passport.authenticate('jwt', {session: false}),
  authController.changePassword
)

router.get('/auth/check-token',
  passport.authenticate('jwt', {session: false}),
  (req, res) => res.end()
)

module.exports = router