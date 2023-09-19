const express = require("express");
const router = express.Router();
const { loginUser } = require("../models/userModel");
const { generateJwtToken } = require("../middleware/authMiddleware");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    if (user === "Error") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const jwtToken = generateJwtToken(user);

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("User login failed: ", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
