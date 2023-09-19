const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/userModel');
const { generateJwtToken } = require('../middleware/authMiddleware');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser(username, email, password);

    const jwtToken = generateJwtToken(user);

    res.json({ token: jwtToken });
  } catch (error) {
    console.error('User registration failed: ', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    if (user === null) {
      return res.status(401).json({ error: 'User not found or invalid password' });
    }

    const jwtToken = generateJwtToken(user);

    res.json({ token: jwtToken });
    console.log('User data fetched from the database:', user);
  } catch (error) {
    console.error('User login failed: ', error);
    res.status(500).json({ error: 'Login failed' });
  }
});


module.exports = router;
