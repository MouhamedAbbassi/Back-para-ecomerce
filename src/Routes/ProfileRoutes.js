 

import express from "express";
const router = express.Router();
import multer from "multer";  
import { storage } from "../Controllers/ProfileController.js";
const Upload=multer({storage:storage});
 import * as ProfileController from "../Controllers/ProfileController.js";
 


router.route("/profile/edit/:id")
    .post(ProfileController.updateUser);

router.route("/profile/editImage/:id")
    .post(Upload.single("image"),ProfileController.updateImage);

router.route("/profile/editPassword/:id")
    .post(ProfileController.updatePassword);



export default router;