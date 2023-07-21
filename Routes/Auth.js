import express from 'express';
const router = express.Router();

import * as authController from '../Controllers/AuthController.js';
import * as profileEdit from '../Controllers/ProfileController.js';

router.post('/registerClient', authController.registerC);
router.post('/registerFourniseur', authController.registerF);
router.post('/login', authController.login);

export default router;