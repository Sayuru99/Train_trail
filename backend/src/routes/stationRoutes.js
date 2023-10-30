const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { getAllStations, addStation, addStations } = require('../models/stationModel');

router.get('/', async (req, res) => {
  try {
    const stations = await getAllStations();
    res.json({ stations });
  } catch (error) {
    console.error('Error getting stations: ', error);
    res.status(500).json({ error: 'Failed to retrieve stations' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const stationData = req.body;
    const result = await addStation(stationData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding station: ', error);
    res.status(500).json({ error: 'Station addition failed' });
  }
});

// for dev
router.post('/addStations', async (req, res) => {
  try {
    const stationData = req.body;
    const result = await addStations(stationData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding stations: ', error);
    res.status(500).json({ error: 'Station addition failed' });
  }
});


module.exports = router;
