const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)

module.exports = router