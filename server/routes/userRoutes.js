const express = require("express");
const router = express.Router();
const { verifyAuth, requireRole } = require("../middlewares/authMiddleware");

// Example route: Get current user info
router.get("/me", verifyAuth, (req, res) => {
  res.json(req.user);
});

// Example route: Only vendors can access
router.get("/vendor-area", verifyAuth, requireRole(["vendor"]), (req, res) => {
  res.json({ message: "Welcome, vendor!", user: req.user });
});

// Example route: Only admin
router.get("/admin-area", verifyAuth, requireRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome, admin!", user: req.user });
});

module.exports = router;
