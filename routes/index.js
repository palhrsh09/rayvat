const { verifyToken } = require("../middleware/index.js");


module.exports = (app, express) => {
  const router = express.Router();

  router.use("/v1", require("./allowed.route.js"));
  router.use("/v1/users", verifyToken, require("./users.routes.js"));
  router.use("/v1/roles", verifyToken, require("./roles.routes.js"));
  app.use("/api", router);
};