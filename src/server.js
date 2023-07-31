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
import productRoutes from "./Routes/ProductRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Enable CORS for specific origins
const corsOptions = {
  origin: ["http://127.0.0.1:3001","http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use("/src/server.js", express.static(path.join(new URL(import.meta.url).pathname, "uploads")));
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
 

app.use("/api/", authRoute);
app.use("/api/", ProfileRoutes);
app.use("/api/", ParaRoutes);
app.use("/api/", productRoutes);

const PORT = 3001;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`);
 
 });