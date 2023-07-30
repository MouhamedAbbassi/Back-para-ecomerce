 

import express from "express";
const router = express.Router();
import multer from "multer";  
import { storage } from "../Controllers/ProfileController.js";
const Upload=multer({storage:storage});
 import * as ProfileController from "../Controllers/ProfileController.js";
 

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64c5a5ea1e56edd8a97b9ec1
 *                 name:
 *                   type: string
 *                   example: med
 *                 email:
 *                   type: string
 *                   example: mouhamed.abbassi@esprit.tn
 *                 phone:
 *                   type: string
 *                   example: 32193219
 *                 token:
 *                   type: string
 *                   example: 356587
 *                 role:
 *                   type: string
 *                   example: client
 *                 age:
 *                   type: integer
 *                   example: 23
 *                 address:
 *                   type: string
 *                   example: ksar-gafsa
 *                 gender:
 *                   type: string
 *                   example: male
 *                 isEmailVerified:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-29T23:51:06.887Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-30T01:13:30.603Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *                 image:
 *                   type: string
 *                   example: "1690679399328.jpeg"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
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
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Profile image file to upload (Multipart/form-data)
 *     responses:
 *       '200':
 *         description: Image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Image updated successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                       example: 500
 *                     message:
 *                       type: object
 *                       properties:
 *                         stringValue:
 *                           type: string
 *                           description: Error message
 *                           example: "64c5a5ea1e56edd8a97b9ec1a"
 *                         valueType:
 *                           type: string
 *                           description: Type of the value causing the error
 *                           example: "string"
 *                         kind:
 *                           type: string
 *                           description: Mongoose data type
 *                           example: "ObjectId"
 *                         value:
 *                           type: string
 *                           description: Value that caused the error
 *                           example: "64c5a5ea1e56edd8a97b9ec1a"
 *                         path:
 *                           type: string
 *                           description: The path where the error occurred
 *                           example: "_id"
 *                         reason:
 *                           type: object
 *                           description: Additional reason for the error
 *                         name:
 *                           type: string
 *                           description: Name of the error
 *                           example: "CastError"
 *                         message:
 *                           type: string
 *                           description: Detailed error message
 *                           example: "Cast to ObjectId failed for value \"64c5a5ea1e56edd8a97b9ec1a\" (type string) at path \"_id\" for model \"userSchema\""
 */
router.route("/profile/editImage/:id")
    .post(Upload.single("image"),ProfileController.updateImage);

    /**
 * @swagger
 * /profile/editPassword/{id}:
 *   post:
 *     summary: Update user password
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: body
 *         name: requestBody
 *         description: Request body for updating password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               description: Old password of the user
 *               example: azerty
 *             newPassword:
 *               type: string
 *               description: New password to set
 *               example: 32193219
 *             newPasswordConfirm:
 *               type: string
 *               description: Confirmation of the new password
 *               example: 32193219
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Password updated successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                       example: 500
 *                     message:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: integer
 *                           description: HTTP status code
 *                           example: 401
 *                         message:
 *                           type: string
 *                           description: Error message
 *                           example: Old password is incorrect
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 *                       example: 400
 *                     message:
 *                       type: string
 *                       description: Error message
 *                       example: New passwords do not match
 */
router.route("/profile/editPassword/:id")
    .post(ProfileController.updatePassword);



export default router;