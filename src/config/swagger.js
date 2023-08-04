import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for Back-end-ParaProject",
    },
    servers:[{url:"http://localhost:3001/api/" }],
    security: [{ bearerAuth: [] }],
  },
   apis: ["./src/Routes/Auth.js","./src/Routes/ProductRoutes.js","./src/Routes/ProfileRoutes.js" , "./src/Routes/CartRoutes.js"] // Point to the location of route files
   };

const specs = swaggerJsdoc(options);  

export { swaggerUi, specs };