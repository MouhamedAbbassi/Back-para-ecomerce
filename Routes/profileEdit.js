const express=require('express');
const router =express.Router()
const authController =require('../Controllers/AuthController.js')
const profileEdit =require('../Controllers/ProfileController.js')

  router.post('/edit/:id',profileEdit.updateUser)


module.exports=router
