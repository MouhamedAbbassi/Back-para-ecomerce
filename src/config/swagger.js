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
  },
<<<<<<< HEAD
  apis: ["./src/Routes/Auth.js","./src/Routes/ProductRoutes.js"] // Point to the location of route files
=======
  apis: ["./src/Routes/Auth.js","./src/Routes/ProfileRoutes.js"] // Point to the location of route files
>>>>>>> e51dec67327b5f32930fa24266ffedf9a3b0e21d
 };

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };