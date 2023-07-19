const express=require('express');
const router =express.Router()
const authController =require('../Controllers/AuthController.js')
const profileEdit =require('../Controllers/ProfileController.js')

  router.post('/edit/:id',profileEdit.updateUser)
  router.post('/editPasswor/:id',profileEdit.updatePassword)


module.exports=router
