import { updateUserProfile ,updateUserPassword, updateUserImage} from "../Services/ProfileService.js";
import multer from "multer";
 

 //////////////////////// UPDATE PROFILE/////////////////////////////////
 export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, phone, age, address, gender } = req.body;

  try {
    const result = await updateUserProfile(id, name, phone, age, address, gender);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "An error occurred" });
  }
}
////////////////////////UPDATE PASSWORD//////////////////////////
export async function updatePassword(req, res) {
  const { id } = req.params;
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  try {
    const result = await updateUserPassword(id, oldPassword, newPassword, newPasswordConfirm, req, res);
    return res.json(result);
  } catch (err) {
     return res.status(500).json({ message:err });
  }
}
///////////UPLOADING FILE USING MULTER////////////
let filename ="";
export const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "src/uploads");
  },
  filename:(req,file,redirect)=>{
    let date=Date.now();
    let fn =date+"."+""+file.mimetype.split("/")[1];
    redirect(null,fn);
    filename =fn;
   }
});
 ///////////////////UPDATE IMAGE///////////////////
export async function updateImage(req, res) {
  const { id } = req.params; 

  try {
    const result = await updateUserImage(id,filename);
    return res.json(result);
  } catch (err) { 
     return res.status(500).json({ message:err });
  }
}