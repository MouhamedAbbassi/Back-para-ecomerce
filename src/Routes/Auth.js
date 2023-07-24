import express from "express";
const router = express.Router();
import multer from "multer";  
import { storage } from "../Controllers/ProfileController.js";
const Upload=multer({storage:storage});
import * as authController from "../Controllers/AuthController.js";
import * as profileEdit from "../Controllers/ProfileController.js";
import * as forgotpassword from "../Controllers/ForgotPassword.js";



router.route("/auth/client")
    .post(authController.registerC);

router.route("/auth/fournisseur")
    .post(authController.registerF);

router.route("/auth/login")
    .post(authController.login);

router.route("/auth/forgotpassword")
    .post(forgotpassword.forget_password)
    .get(forgotpassword.reset_password);

router.route("/profile/edit/:id")
    .post(profileEdit.updateUser);

router.route("/profile/editImage/:id")
    .post(Upload.single("image"),profileEdit.updateImage);

router.route("/profile/editPassword/:id")
    .post(profileEdit.updatePassword);



export default router;