import Fournisseurs from "../Models/Fournisseurs.js";
import { DeleteFourniseur,getAllFournisseurs,updateFournisseur} from "../Services/ParaService.js";


///////////////////REGISTER FOURNISSEUR//////////////////
export const registerF = (req, res) => {
    const { name, email, password, phone } = req.body;
    const fournisseur = new Fournisseurs({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
  
    fournisseur.register()
      .then(savedFournisseur => {
        res.json({ message: "Fournisseur added successfully!", savedFournisseur });
      })
      .catch(error => {
        res.json({ message: "An error occurred", error });
      });
  };
///////////////////GET ALL FOURNISSEUR//////////////////

  export async function getAllFournisseur(req, res) {
    try {
      const allFournisseurs = await getAllFournisseurs();
      return res.status(200).json(allFournisseurs);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch fournisseurs." });
    }
  }
///////////////////DELETE FOURNISSEUR//////////////////

 export async function deleteFournisseur(req, res) {
    const { id } = req.params;
    try {
      const deletedFournisseur = await DeleteFourniseur(id);
      if (!deletedFournisseur) {
        return res.status(404).json({ message: "Fournisseur not found." });
      }
      return res.status(200).json({ message: "Fournisseur deleted successfully.", deletedFournisseur });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete fournisseur." });
    }
  }

  export async function updateFournisseurById(req, res) {
    const { id } = req.params; // ID as a URL parameter
    const { name, email, phone } = req.body;
 
     updateFournisseur(id,name,email, phone)
    .then((result) => {
     return res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
  }


 