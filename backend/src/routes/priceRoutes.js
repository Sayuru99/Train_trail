const express = require('express');
const router = express.Router();
const { getTicketPrice } = require('../models/priceModel');

router.get('/get-price', async (req, res) => {
  try {
    const { fromStationID, toStationID } = req.query;
    const price = await getTicketPrice(fromStationID, toStationID);
    if (price !== null) {
      res.status(200).json({ price });
    } else {
      res.status(404).json({ error: 'Ticket price not found' });
    }
  } catch (error) {
    console.error('Error fetching ticket price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
