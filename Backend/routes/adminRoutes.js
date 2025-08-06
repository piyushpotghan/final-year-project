const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/AuthMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// ✅ Example: Only admin can access this route
router.get("/admin/dashboard", verifyToken, checkRole("admin"), (req, res) => {
  res.send("Welcome Admin!");
});

module.exports = router;
