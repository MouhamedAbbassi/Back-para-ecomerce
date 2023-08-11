import("./config/connexions.js");  
//import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import morgan from "morgan";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";  
import { swaggerUi, specs } from "./config/swagger.js";
import authRoute from "./Routes/Auth.js";
import ProfileRoutes from "./Routes/ProfileRoutes.js";
import ParaRoutes from "./Routes/ParaRoutes.js";
import cors from "cors";
import OrderRoutes from './Routes/OrderRoutes.js';
import wishlistRoutes from './Routes/wishlistRouters.js';
import productRoutes from './Routes/ProductRoutes.js';
import { fileURLToPath } from "url";
import { dirname } from "path";

import session from 'express-session';
import redisStore from '../src/Middleware/session-store.js';


import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';


 
// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Enable CORS for specific origins
const corsOptions = {
  origin: ["http://127.0.0.1:3001","http://localhost:5173"],
};

app.use(cors(corsOptions));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
 

app.use("/api/", authRoute);
app.use("/api/", ProfileRoutes);
app.use("/api/", ParaRoutes);
app.use("/api/", productRoutes);
app.use('/api/', OrderRoutes);

////////////////////ABOUT OAUTH/////////////////////

// Google authentication route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Redirect after successful authentication
  res.redirect('/profile');
});



////////////session middleware
app.use(
  session({
    store: redisStore,
    saveUninitialized: false,
    resave: false,
    secret: 'keyboard cat',
  })
);

// app.use(sessionMiddleware);
app.use('/api/', wishlistRoutes);
app.get('/', (req, res) => {
  console.log('Request Redis Client:', redisClient);
  res.send('Hello, Express session with Redis!');
});




const PORT = 3001;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
 
 });