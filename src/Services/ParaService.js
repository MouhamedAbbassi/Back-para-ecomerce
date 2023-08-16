import Fournisseurs from "../Models/Fournisseurs.js";

///////////////////GET ALL FOURNISSEUR//////////////////
async function getAllFournisseurs() {
    try {
     
      const allFournisseurs = await Fournisseurs.find({role:"fournisseur"});
      return allFournisseurs;
    } catch (error) {
      throw new Error("Failed to fetch fournisseurs.");
    }
  }

///////////////////DELETE FOURNISSEUR////////////////////////////
async function DeleteFourniseur(id) {
    try {
   
      const deletedFournisseur = await Fournisseurs.findByIdAndDelete(id);
      return deletedFournisseur;
    } catch (error) {
      throw new Error("Failed to delete fournisseur.");
    }
  }

///////////////////UPDATE FOURNISSEUR//////////////////
  async function updateFournisseur(id,  name, email, phone) {
    try {
        const user = await Fournisseurs.findById(id);
        if (!user) {
            throw new Error("fournisseur not found.");
        }
        user.name = name || user.name; // Only update if the new value is not null, otherwise keep the old value
        user.email = email || user.email;
        user.phone = phone || user.phone;
     
         const updatedUser = await user.save();
        return updatedUser;

      } catch (error) {
        throw new Error("Failed to update fournisseur.");
    }
  }

  export { DeleteFourniseur,getAllFournisseurs,updateFournisseur };
