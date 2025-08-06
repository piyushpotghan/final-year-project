// // ✅ UPDATED routes/Auth.js
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashed, role });
//     await user.save();

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/AuthController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
