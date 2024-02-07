const express = require('express')
const AuthController = require('../../controller/AuthController')
const router = express.Router()

//username & password

router.post('/login', AuthController.login)

module.exports=router