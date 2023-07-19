const express=require('express');
const router =express.Router()
const authController =require('../Controllers/AuthController.js')
const profileEdit =require('../Controllers/ProfileController.js')

router.post('/register',authController.register)
router.post('/login',authController.login)


module.exports=router
