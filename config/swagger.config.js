const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Event Booking API",
    version: "1.0.0",
    description: "API documentation for the Event Booking System",
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1", 
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./controllers/*.js"], 
};

module.exports = swaggerJSDoc(options);
