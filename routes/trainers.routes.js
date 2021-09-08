const router  = require('express').Router()
const trainersController = require('../controllers/trainers.controller')
const passport = require('passport')
const multer = require('../middleware/multer.trainers')

router.post('/add',
  passport.authenticate('jwt', {session: false}),
  multer.single('avatar'),
  trainersController.add
)

router.post('/delete', passport.authenticate('jwt', {session: false}), trainersController.delete)

router.post('/edit',
  passport.authenticate('jwt', {session: false}),
  multer.single('avatar'),
  trainersController.edit
)

router.get('/getAll', trainersController.getTrainers)

module.exports = router
