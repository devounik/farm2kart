const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

exports.verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error: ", error);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

exports.requireRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden. Insufficient role." });
    }
    next();
  };
};
