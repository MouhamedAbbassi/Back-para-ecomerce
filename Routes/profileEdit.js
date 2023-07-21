import express from 'express';
const router =express.Router()


import * as authController from '../Controllers/AuthController.js';
import * as profileEdit from '../Controllers/ProfileController.js';

router.post('/edit/:id',profileEdit.updateUser)
router.post('/editPassword/:id',profileEdit.updatePassword)

  export default router;