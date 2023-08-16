import("./config/connexions.js");
import morgan from "morgan";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { swaggerUi, specs } from "./config/swagger.js";
import authRoute from "./Routes/Auth.js";
import ProfileRoutes from "./Routes/ProfileRoutes.js";
import ParaRoutes from "./Routes/ParaRoutes.js";
import cors from "cors";
import productRoutes from "./Routes/ProductRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import crypto from "crypto";
import passport from "passport";
import cookieSession from "cookie-session";
import setUpPassport from "./Routes/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: [key1, key2],
  })
);

// Configure Passport using setUpPassport function
setUpPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: ["http://127.0.0.1:3001", "http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/", authRoute);
app.use("/api/", ProfileRoutes);
app.use("/api/", ParaRoutes);
app.use("/api/", productRoutes);

app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

app.get("/auth", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "profile"]
}));

app.get("/auth/callback", passport.authenticate("google", {
  successRedirect: "/auth/callback/success",
  failureRedirect: "/auth/callback/failure",
}));

app.get("/auth/callback/success", (req, res) => {
  if (!req.user) res.redirect("/auth/callback/failure");
  res.send("Welcome " + req.user.email);
});

app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 




