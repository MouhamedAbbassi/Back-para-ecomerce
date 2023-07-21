import  userSchema  from '../Models/User.js';
import Client from '../Models/Client.js';
import Fournisseurs from '../Models/Fournisseurs.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

///////////////////REGISTER CLIENT//////////////////
export const registerC = (req, res, next) => {
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
export const registerF = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const fournisseur = new Fournisseurs({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  fournisseur.register()
    .then(savedFournisseur => {
      res.json({ message: 'Fournisseur added successfully!', savedFournisseur });
    })
    .catch(error => {
      res.json({ message: 'An error occurred', error });
    });
};

///////////////////LOGIN//////////////////
export const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

   userSchema.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ message: err });
          } else if (result) {
            let token = jwt.sign({ name: user.name }, 'very secret value', { expiresIn: '1h' });
            res.json({
              message: 'Login successfully!',
              token
            });
          } else {
            res.json({ message: 'Password does not match' });
          }
        });
      } else {
        res.json({ message: 'No user found!' });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ message: err });
    });
};