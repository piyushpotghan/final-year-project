// const express = require("express");
// const router = express.Router();
// const Contact = require("../models/Contact");

// router.post("/", async (req, res) => {
//   try {
//     const { fullName, email, message } = req.body;
//     const contact = new Contact({ fullName, email, message });
//     await contact.save();
//     res.status(201).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

router.post("/", sendMessage);

module.exports = router;
