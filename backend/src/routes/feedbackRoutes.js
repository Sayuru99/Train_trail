const express = require('express');
const router = express.Router();
const { addFeedback } = require('../models/feedbackModel');

router.post('/add', async (req, res) => {
  try {
    const feedbackData = req.body;
    const result = await addFeedback(feedbackData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding feedback: ', error);
    res.status(500).json({ error: 'Feedback addition failed' });
  }
});

module.exports = router;