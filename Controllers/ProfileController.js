const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');


/////////////////////////////////////////////////////////////////
//////////////////////// UPDATE /////////////////////////////////
/////////////////////////////////////////////////////////////////

async function updateUser(req, res) {

  const { id } = req.params; // the user ID as a URL parameter
  const { name, email,phone } = req.body; //updated user data in the request body
  try {
    // Retrieve the user from the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name; // Only update if the new value is provided, otherwise keep the existing value
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // Save the changes back to the database
    const updatedUser = await user.save();

    // Return the updated user as a response
    res.json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ error: 'Failed to update user' });
  }
}
/////////////////////////////////////////////////////////////////
////////////////////////CHECK OLD PASSWORD///////////////////////
/////////////////////////////////////////////////////////////////

const checkOldPassword = async (enteredPassword, hashedPassword) => {

  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;

};
/////////////////////////////////////////////////////////////////
////////////////////////UPDATE PASSWORD//////////////////////////
/////////////////////////////////////////////////////////////////

const updatePassword = async (req, res) => {
  const { id } = req.params; // the user ID as a URL parameter
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  // if new passwords match
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

    // Update the user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



 module.exports={
  updateUser,updatePassword
}