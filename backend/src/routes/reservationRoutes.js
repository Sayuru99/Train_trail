const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const { bookTrain, getTrainBookingDetails } = require('../models/trainBookingModel');

router.post('/book', isAuthenticated, async (req, res) => {
  try {
    const bookingData = req.body;
    bookingData.PassengerID = req.user.PassengerID;

    const result = await bookTrain(bookingData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error booking train: ', error);
    res.status(500).json({ error: 'Train booking failed' });
  }
});

router.get('/details/:bookingID', isAuthenticated, async (req, res) => {
  try {
    const bookingID = req.params.bookingID;

    const bookingDetails = await getTrainBookingDetails(bookingID);
    res.json(bookingDetails);
  } catch (error) {
    console.error('Error getting booking details: ', error);
    res.status(500).json({ error: 'Failed to retrieve booking details' });
  }
});

module.exports = router;
