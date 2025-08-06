const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    const contact = new Contact({ fullName, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
