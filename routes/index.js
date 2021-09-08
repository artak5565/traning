const router  = require('express').Router()

router.use('/admin', require('./admin.routes'))
router.use('/learner', require('./learner.routes'))
router.use('/feedback', require('./feedback.routes'))
router.use('/courses', require('./courses.routes'))
router.use('/trainers', require('./trainers.routes'))

module.exports = router