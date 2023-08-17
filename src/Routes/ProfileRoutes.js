 

import express from "express";
const router = express.Router();
import multer from "multer";  
import { storage } from "../Controllers/ProfileController.js";
const Upload=multer({storage:storage});
 import * as ProfileController from "../Controllers/ProfileController.js";
 import getUserInfo from "../Controllers/ProfileController.js";
 import getUserRole from "../Controllers/ProfileController.js";
/**
 * @swagger
 * /profile/edit/{id}:
 *   post:
 *     summary: Update user profile
 *     tags: [Profile]
 *     description: Update the user profile with the provided data.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID as a URL parameter
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *             example:
 *               name: med
 *               phone: 32193219
 *               age: 23
 *               address: ksar-gafsa
 *               gender: male
 *     responses:
 *       200:
 *         description: Successful update
 *       
 *       500:
 *         description: Something went wrong
 *       
 */
router.route("/profile/edit/:id")
    .post(ProfileController.updateUser);
/**
 * @swagger
 * /profile/editImage/{id}:
 *   post:
 *     summary: Update user profile image
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image updated successfully
 *       '500':
 *         description: Internal server error
 */
router.route("/profile/editImage/:id")
    .post(Upload.single("image"),ProfileController.updateImage);

   /**
 * @swagger
 * /profile/editPassword/{id}:
 *   post:
 *     summary: Update user password
 *     tags: [Profile]
 *     description: Update the user's password with the provided data.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID as a URL parameter
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: azerty
 *               newPassword:
 *                 type: string
 *                 example: 32193219
 *               newPasswordConfirm:
 *                 type: string
 *                 example: 32a193219
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       500:
 *         description: Old password is incorrect ! OR new password does not match !
 */ 
router.route("/profile/editPassword/:id")
    .post(ProfileController.updatePassword);


router.route("/profile/getUserInfo/:id").get(getUserInfo);
router.route("/profile/getUserRole/:id").get(getUserRole);
export default router;