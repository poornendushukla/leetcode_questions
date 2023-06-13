const express = require('express')
const router = express.Router()
const AuthController = require('../controller/authController')
const AdminController = require('../controller/admin')

// admin 

router.get("/logs",AdminController.getLogs)


module.exports = router