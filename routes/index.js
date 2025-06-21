const { verifyToken,rbacValidation } = require("../middleware/index.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger.config.js");

module.exports = (app, express) => {
  const router = express.Router();

  router.use("/v1", require("./allowed.route.js"));
  router.use("/v1/users", verifyToken,rbacValidation,require("./users.routes.js"));
  router.use("/v1/events", verifyToken,rbacValidation, require("./events.routes.js"));
  router.use("/v1/roles",verifyToken,rbacValidation, require("./roles.routes.js"));
   router.use("/v1/booking",verifyToken,rbacValidation, require("./booking.route.js"));
  app.use("/api", router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

