const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { getAllTrains, addTrain, addArrive, getTrainsBetweenStations } = require('../models/trainModel');

router.get('/', async (req, res) => {
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

router.put('/update/:trainID', isAdmin, async (req, res) => {
  try {
    const trainID = req.params.trainID;
    const trainData = req.body;
    const result = await updateTrain(trainID, trainData);
    res.json(result);
  } catch (error) {
    console.error('Error updating train: ', error);
    res.status(500).json({ error: 'Train update failed' });
  }
});

router.post('/addarrive', async (req, res) => {
  try {
    const { trainID, stationID } = req.body;
    const result = await addArrive (trainID, stationID);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding arrival relationship: ', error);
    res.status(500).json({ error: 'Arrival relationship addition failed' });
  }
});

router.get('/trains-between-stations', async (req, res) => {
  try {
    const { fromStation, toStation } = req.query;
    const trains = await getTrainsBetweenStations(fromStation, toStation);
    res.json({ trains });
  } catch (error) {
    console.error('Error getting trains between stations: ', error);
    res.status(500).json({ error: 'Failed to retrieve trains' });
  }
});

module.exports = router;