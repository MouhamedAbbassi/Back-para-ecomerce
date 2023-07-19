
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');

 const register=(req,res,next)=>{
     bcrypt.hash(req.body.password,10,function(err,hashedPass){
      if(err){
        res.json({
          error:err
        })
      }
        let user =new User({
          name:req.body.name,
          email:req.body.email,
           password:hashedPass,
           phone:req.body.phone
        })
        
        user.save()
          .then(user=>{
            res.json({
              message: 'user added successfully!'
            })
          })
          .catch(error=>{
            res.json({
              message: 'an error was happend'
            })
          })
})

 }
 const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              message: err
            });
          } else if (result) {
            let token = jwt.sign({ name: user.name }, 'very secret value', { expiresIn: '1h' });
            res.json({
              message: 'Login successfully!',
              token
            });
          } else {
            res.json({
              message: 'Password does not matched'
            });
          }
        });
      } else {
        res.json({
          message: 'No user found!'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        message: err
      });
    });
};

 module.exports={
  register,login
}