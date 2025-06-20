const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const config = require("../config/app.config");
const dbConfig = require("../config/db.config");
const routes = require("../routes");
const db = require("../models");

const app = express();

app.set("trust proxy", true);

const whitelist = config.CORS_URLS.split(",");
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) > -1 || process.env.NODE_ENV === "DEV") {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(`Headers:`, req.headers);
  console.log(`Body:`, req.body);
  next();
});

require("../routes/index")(app, express);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const initializeRoles = async () => {
  const Role = db.role;
  const requiredRoles = ["Admin", "User"];

  for (const title of requiredRoles) {
    const exists = await Role.findOne({ title });
    if (!exists) {
      await Role.create({ title, status: "active" });
      console.log(`Role '${title}' created`);
    } else {
      console.log(`Role '${title}' already exists`);
    }
  }
};

(async () => {
  try {
    await db.mongoose.connect(dbConfig.URI, {
      dbName: dbConfig.DB_NAME,
    });
    console.log("MongoDB connected successfully.");

    await initializeRoles();

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
})();
