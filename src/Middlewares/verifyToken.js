import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/User.js';

const secretKey = 'very secret value'; 

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      req.user = await User.findById(decoded._id).select('-password'); 
      console.log('Authenticated user:', req.user); 
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


export { protect };
