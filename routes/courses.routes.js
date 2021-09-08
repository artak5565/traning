const router  = require('express').Router()
const coursesController = require('../controllers/courses.controller')
const passport = require('passport')
const multer = require('../middleware/multer.cources')

router.post('/add',
  passport.authenticate('jwt', {session: false}),
  multer.single('icon'),
  coursesController.add
)

router.post('/delete', passport.authenticate('jwt', {session: false}), coursesController.delete)

router.post('/edit',
  passport.authenticate('jwt', {session: false}),
  multer.single('icon'),
  coursesController.edit
)

router.get('/get', coursesController.getCourses)

module.exports = router
