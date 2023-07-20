
const { User } = require('../Models/User'); 
const Client = require('../Models/Client'); 
const Fournisseurs = require('../Models/Fournisseurs'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

///////////////////REGISTER CLIENT//////////////////
const registerC = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const client = new Client({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  client.register()
    .then(savedClient => {
      res.json({ message: 'Client added successfully!', savedClient });
    })
    .catch(error => {
      res.json({ message: 'An error occurred', error });
    });
};
///////////////////REGISTER FOURNISSEUR//////////////////
const registerF = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const Fournisseur = new Fournisseurs({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  Fournisseur.register()
    .then(savedClient => {
      res.json({ message: 'Client added successfully!', savedClient });
    })
    .catch(error => {
      res.json({ message: 'An error occurred', error });
    });
};

///////////////////LOGIN//////////////////
 const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err)
           {res.json({message: err});} 
          else if (result) {
            let token = jwt.sign({ name: user.name }, 'very secret value', { expiresIn: '1h' });
            res.json({
              message: 'Login successfully!',
              token
            });
          } else {
            res.json({message: 'Password does not matched'});}
        });
      } else {res.json({message: 'No user found!'});}
    })
    .catch(err => {console.log(err);
      res.json({message: err});
    });
};

 module.exports={
  registerC,login,
  registerF
}