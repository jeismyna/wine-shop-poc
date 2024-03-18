
const express = require('express')

const UserController = require('../controllers/user-controller')

const router = express.Router()

router.post('/user', UserController.createUser)
router.get('/user/:username/:password', UserController.getUserByUsernameAndPassword)

module.exports = router