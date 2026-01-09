const router = require('express').Router()
router.use('/auth', require('./auth.routes'))
router.use('/faculty', require('./faculty.routes'))
router.use('/student', require('./student.routes'))
router.use('/system', require('./system.routes'))
router.use('/messages', require('./message.routes'))
router.use('/dispute', require('./dispute.routes'))
router.use('/notifications', require('./notification.routes'))
router.use('/admin', require('./admin.routes'))
router.use('/parent', require('./parent.routes'))

module.exports = router
