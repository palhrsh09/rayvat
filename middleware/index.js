const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const db = require("../models");
const UserToken = db.userToken;
const { hashText } = require("../utils");
const rbac = require('../config/rbac.config');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tokenSignature = await hashText(token.split(".")[2]);

const userToken = await UserToken.findOne({ userId: decoded?.userId });
    if (!userToken) return res.status(401).json({ error: "Invalid session" });
    
    if (tokenSignature !== userToken.tokenSignature) return res.status(401).json({ error: "Token signature mismatch" });

    if (userToken.expiredAt < new Date()) return res.status(401).json({ error: "Token expired" });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;

const normalizePath = (path) => {
  console.log("🚀 ~ normalizePath ~ path:", path);
  
  return path
    .split("?")[0] 
    .split("/")
    .map((segment) => (isValidObjectId(segment) ? ":id" : segment))
    .join("/");
};
const rbacValidation = (req, res, next) => {
  try {
    const role = req.user.role;
    const permissions = rbac[role]?.routes || [];

      let fullPath = req.originalUrl.split("?")[0];

       if (fullPath.startsWith("/api")) {
      fullPath = fullPath.replace("/api", "");
    }

    const requestPath = normalizePath(fullPath);
    const requestMethod = req.method;

    // console.log("🚀 Normalized Path:", requestPath);
    // console.log("🚀 ~ rbacValidation ~ permissions:", permissions)
    // console.log("🚀 ~ rbacValidation ~ role:", role)
    // console.log("🚀 Method:", requestMethod);

    const isAllowed = permissions.some((route) => {
      return (
        route.path === requestPath &&
        route.methods.includes(requestMethod)
      );
    });

    if (!isAllowed) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    next();
  } catch (error) {
    console.log("🚀 ~ rbacValidation ~ error:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};


module.exports = {
    verifyToken,
    rbacValidation
};
