import express from 'express';
const router = express.Router();

import * as authController from '../Controllers/AuthController.js';
import * as profileEdit from '../Controllers/ProfileController.js';
import * as forgotpassword from '../Controllers/ForgotPassword.js';

router.post('/registerClient', authController.registerC);
router.post('/registerFourniseur', authController.registerF);
router.post('/login', authController.login);
router.post('/forgotpassword',forgotpassword.forget_password);
router.get('/reset-password',forgotpassword.reset_password);


export default router;