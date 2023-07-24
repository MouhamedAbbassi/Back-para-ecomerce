import { updateUserProfile ,updateUserPassword, updateUserImage} from "../Services/ProfileService.js";
import multer from "multer";
 

 //////////////////////// UPDATE PROFILE/////////////////////////////////
export async function updateUser(req, res) { 
  const { id } = req.params; // ID as a URL parameter
  const { name, email, phone } = req.body; // the request body

  updateUserProfile(id,name,email, phone)
  .then((result) => {
   return res.json(result);
  })
  .catch((err) => {
    res.json({ message: err });
  });
   
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
/////////////////UPLOADING FILE/////////////////
let filename ="";
export const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "uploads");
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
 
  const { id } = req.params; // ID as a URL parameter
  try {
    const result = await updateUserImage(id,filename);
    return res.json(result);
  } catch (err) {
     return res.status(500).json({ message:err });
  }
}