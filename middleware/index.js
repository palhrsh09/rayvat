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
    console.log("🚀 ~ verifyToken ~ decoded:", decoded)
    const tokenSignature = await hashText(token.split(".")[2]);
    console.log("🚀 ~ verifyToken ~ tokenSignature:", tokenSignature)

const userToken = await UserToken.findOne({ userId: decoded?.userId });
console.log("🚀 ~ verifyToken ~ userToken:", userToken)
    if (!userToken) return res.status(401).json({ error: "Invalid session" });
    
    if (tokenSignature !== userToken.tokenSignature) return res.status(401).json({ error: "Token signature mismatch" });

    if (userToken.expiredAt < new Date()) return res.status(401).json({ error: "Token expired" });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const rbacValidation = async (req, res, next) => { 
  try {
      const role = req.user.role
      console.log("🚀 ~ rbacValidation ~ role:", role)
      const permissions = rbac[role]?.routes || [];
      console.log("🚀 ~ rbacValidation ~ permissions:", permissions)
      const requestPath = req.baseUrl.replace('/api', '');
      console.log("🚀 ~ rbacValidation ~ requestPath:", requestPath)
      const requestMethod = req.method;

    const isAllowed = permissions.some(route => {
      return (
        requestPath.startsWith(route.path) &&
        route.methods.includes(requestMethod)
      );
    });

    if (!isAllowed) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = {
    verifyToken,
    rbacValidation
};
