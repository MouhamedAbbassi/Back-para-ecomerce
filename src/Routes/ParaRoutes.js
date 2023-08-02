 

import express from "express";
const router = express.Router();
    import * as ParaController from "../Controllers/ParaController.js";
 

    router.route("/fournisseur/getAll")
    .get(ParaController.getAllFournisseur);
    
    router.route("/fournisseur/delete/:id")
    .delete(ParaController.deleteFournisseur);

    router.route("/fournisseur/update/:id")
    .post(ParaController.updateFournisseurById);



export default router;