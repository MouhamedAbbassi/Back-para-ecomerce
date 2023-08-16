/*import asyncHandler from 'express-async-handler';
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

export { client, admin, supplier }*/

import userSchema from '../Models/User.js';

const authorizationMiddleware = (req, res, next) => {
    //const user = req.userSchema; 
  
    if (req.userSchema.role === 'admin' || req.userSchema.role === 'fournisseur') {
      next(); // User is authorized, continue to the next middleware/route handler
    } else {
      res.status(403).json({ message: 'Unauthorized' }); // User doesn't have the required role
    }
  };
  
  export default {authorizationMiddleware};