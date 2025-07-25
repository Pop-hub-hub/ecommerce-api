const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(403).json({ status: "error", message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;