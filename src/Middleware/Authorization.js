import asyncHandler from 'express-async-handler';
import userSchema from '../Models/User.js';

const client = asyncHandler(async (req, res, next) => {
  if (req.userSchema && req.userSchema.role === 'client') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as a client');
  }
});

const admin = (req, res, next) => {
    console.log("barrek",req.userSchema);
  if (req.userSchema && req.userSchema.role === 'admin') { 
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};

const supplier = (req, res, next) => {
  if (req.userSchema && req.userSchema.role === 'fournisseur') {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as a supplier');
  }
};

export { client, admin, supplier }
