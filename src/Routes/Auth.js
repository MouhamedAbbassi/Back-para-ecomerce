import express from "express";
const router = express.Router();
import passport from "passport";

   import * as authController from "../Controllers/AuthController.js";
 import * as ParaController from "../Controllers/ParaController.js";
 import * as forgotpassword from "../Controllers/ForgotPassword.js";



/**
 * @swagger
 * /auth/client:
 *   post:
 *     summary: Register a new client
 *     tags: [Athentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: test
 *               email: test@example.com
 *               password: mypassword
 *               phone: 123456789
 *     responses:
 *       200:
 *         description: Client added successfully, waitng for the verification          
 *       500:
 *         description: An error occurred
 */
router.route("/auth/client")
    .post(authController.registerC);


    /**
 * @swagger
 * /auth/fournisseur:
 *   post:
 *     summary: Register a new Fournisseur
 *     tags: [Athentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: test
 *               email: test@example.com
 *               password: mypassword
 *               phone: 123456789
 *     responses:
 *       200:
 *         description: Fournisseur added successfully
 *       500:
 *         description: An error occurred
 *         
 */
router.route("/auth/fournisseur")
    .post(ParaController.registerF);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with username and password
 *     tags: [Athentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: Email||Phone
 *               password: ++++++++++++
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfully!
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlhdCI6MTY5MDE3NjE4NiwiZXhwIjoxNjkwMTc5Nzg2fQ.VFXQdAFN-2ND7iPg4DtSk6wPibOwzwayEulf_pTsEMs"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password does not match
 */
router.route("/auth/login")
    .post(authController.login);

    /**
 * @swagger
 * /auth/verif:
 *   post:
 *     summary: Verify account using verification code
 *     tags: [Athentification]
 *     description: Verify the user's account using the provided verification code and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Account has been verified
 *          
 *       500:
 *         description:  Code incorrect, please try later!
 *  
 */
    router.route("/auth/verif")
    .post(authController.VerificationCode);



/**
 * @swagger
 * /auth/forgotpassword:
 *   post:
 *     summary: forget password with email
 *     tags: [Athentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: Email
 *     responses:
 *       200:
 *         description: please check your inbox of mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: please check your inbox of mail.
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred
 *                 error:
 *                   type: object
 *                   properties:
 *                     index:
 *                       type: number
 *                     code:
 *                       type: number
 *                     keyPattern:
 *                       type: object
 *                     keyValue:
 *                       type: object
 */

router.route("/auth/forgotpassword")
    .post(forgotpassword.forget_password);
    
router.route("/auth/resetpassword")
    .get(forgotpassword.reset_password);


 


export default router;