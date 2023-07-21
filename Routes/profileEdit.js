import express from 'express';
const router =express.Router()

import multer from 'multer';  

import * as authController from '../Controllers/AuthController.js';
import * as profileEdit from '../Controllers/ProfileController.js';

import { storage } from '../Controllers/ProfileController.js';
const Upload=multer({storage:storage});



router.post('/edit/:id',profileEdit.updateUser)
router.post('/editImage/:id',Upload.single('image'),profileEdit.updateUser)
router.post('/editPassword/:id',profileEdit.updatePassword)




  export default router;