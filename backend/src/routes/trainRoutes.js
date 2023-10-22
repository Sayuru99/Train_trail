const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { getAllTrains, addTrain } = require('../models/trainModel');

router.get('/', isAdmin, async (req, res) => {
  try {
    const trains = await getAllTrains();
    res.json({ trains });
  } catch (error) {
    console.error('Error getting trains: ', error);
    res.status(500).json({ error: 'Failed to retrieve trains' });
  }
});

router.post('/add', isAdmin, async (req, res) => {
  try {
    const trainData = req.body;
    const result = await addTrain(trainData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding train: ', error);
    res.status(500).json({ error: 'Train addition failed' });
  }
});

module.exports = router;
