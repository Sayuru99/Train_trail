const express = require("express");
const router = express.Router();

const { registerUser } = require("../models/userModel");
const { generateJwtToken } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser(username, email, password);

    const jwtToken = generateJwtToken(user);

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("User registration failed: ", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
