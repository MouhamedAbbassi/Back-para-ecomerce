import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../Models/User.js';
import mongoose from 'mongoose';
import multer from 'multer';




/////////////////////////////////////////////////////////////////
//////////////////////// UPDATE /////////////////////////////////
/////////////////////////////////////////////////////////////////

export async function updateUser(req, res) {
  console.log(storage);
 
  const { id } = req.params; // ID as a URL parameter
  const { name, email, phone } = req.body; // the request body
  try {

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name; // Only update if the new value is not null, otherwise keep the old value
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.image = filename || user.image;

     const updatedUser = await user.save();
     filename='';

     res.json(updatedUser);
  } catch (error) {
     res.status(500).json({ error: 'Failed to update user' });
  }
}

/////////////////////////////////////////////////////////////////
////////////////////////CHECK OLD PASSWORD///////////////////////
/////////////////////////////////////////////////////////////////

export async function checkOldPassword(enteredPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
}

/////////////////////////////////////////////////////////////////
////////////////////////UPDATE PASSWORD//////////////////////////
/////////////////////////////////////////////////////////////////

export async function updatePassword(req, res) {
  const { id } = req.params; // the user ID as a URL parameter
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;
 console.log(id)
 if (!mongoose.Types.ObjectId.isValid(id)) 
 return res.status(404).json({ msg: `No task with id :${id}` });
  // if new passwords don't match
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({ message: 'New passwords do not match' });
  }

  try {
    const user = await User.findById(id);
    const storedHashedPassword = user.password;

    // Verify the old password
    const isOldPasswordCorrect = await checkOldPassword(oldPassword, storedHashedPassword);
    if (!isOldPasswordCorrect) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10); // salt generation
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash the new password
    console.log(hashedPassword);
     await User.findOneAndUpdate({_id:id},{ password: hashedPassword });
     console.log(User.password);



    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: error });
  }
}

/////////////////////////////////////////////////////////////////
////////////////////////UPDATE Image//////////////////////////
/////////////////////////////////////////////////////////////////
let filename ='';
export const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename:(req,file,redirect)=>{
    let date=Date.now();
    let fn =date+'.'+''+file.mimetype.split('/')[1];
    redirect(null,fn);
    filename =fn;
   }
});

export async function updateImage(req, res) {
 
  const { id } = req.params; // ID as a URL parameter
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.image = filename || user.image;
     const updateImage = await user.save();
     filename='';
    res.json({message:'Image updated successfully'})
     res.json(updateImage);
  } catch (error) {
     res.status(500).json({ error: 'Failed to update user' });
  }
}