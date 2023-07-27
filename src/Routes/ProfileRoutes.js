 

import express from "express";
const router = express.Router();
import multer from "multer";  
import { storage } from "../Controllers/ProfileController.js";
const Upload=multer({storage:storage});
 import * as profileEdit from "../Controllers/ProfileController.js";
 


router.route("/profile/edit/:id")
    .post(profileEdit.updateUser);

router.route("/profile/editImage/:id")
    .post(Upload.single("image"),profileEdit.updateImage);

router.route("/profile/editPassword/:id")
    .post(profileEdit.updatePassword);



export default router;