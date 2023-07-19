const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

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

 module.exports={
  updateUser
}