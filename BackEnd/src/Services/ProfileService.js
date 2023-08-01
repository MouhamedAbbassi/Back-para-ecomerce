import User from "../Models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";


////////////////////////Update User Profile///////////////////////
async function updateUserProfile(id, name, phone, age, address, gender) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw { status: 404, message: `User not found :${id}` };
    }  
      user.name = name || user.name; // Only update if the new value is not null, otherwise keep the old value
      user.phone = phone || user.phone;
      user.age = age || user.age;
      user.address = address || user.address;  
      user.gender = gender || user.gender;
      await user.save();

      return { message: " updated successfully" }; 
  } catch (error) {
    throw { status: 500, message: error };
  }
}
  ////////////////////////CHECK OLD PASSWORD///////////////////////
    async function checkOldPassword(enteredPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
  }
  ////////////////////////Update PASSWORD///////////////////////
  async function updateUserPassword(id, oldPassword, newPassword, newPasswordConfirm) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { status: 404, message: `No task with id :${id}` };
    }
    if (newPassword !== newPasswordConfirm) {
      throw { status: 400, message: "New passwords do not match" };
    }
    try {
      const user = await User.findById(id);
      const storedHashedPassword = user.password;
      const isOldPasswordCorrect = await checkOldPassword(oldPassword, storedHashedPassword);
      if (!isOldPasswordCorrect) {
        throw { status: 401, message: "Old password is incorrect" };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findOneAndUpdate({ _id: id }, { password: hashedPassword });
  
      return { message: "Password updated successfully" };
    } catch (error) {
       throw { status: 500, message: error };
    }
  }
 ////////////////////////UPDATE IMAGE//////////////////////////
  async function updateUserImage(id,filename) {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw { status: 404, message: `User not found :${id}` };
        }
        user.image = filename || user.image;
           filename="";
           await user.save();
         return { message: "Image updated successfully" };
       } catch (error) {
        throw { status: 500, message: error };
     }
  }

  export { updateUserProfile,updateUserPassword,updateUserImage };
