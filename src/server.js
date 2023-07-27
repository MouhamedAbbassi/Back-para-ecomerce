import("./config/connexions.js");  
//import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import morgan from "morgan";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";  
import { swaggerUi, specs } from "./config/swagger.js";
import authRoute from "./Routes/Auth.js";
import ProfileRoutes from "./Routes/ProfileRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(new URL(import.meta.url).pathname, "uploads")));
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
 

app.use("/api/", authRoute);
app.use("/api/", ProfileRoutes);
 


const PORT = 3001;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
 
 });