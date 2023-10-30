const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { getAllNews, addNews } = require('../models/newsModel');

router.get('/', async (req, res) => {
  try {
    const news = await getAllNews();
    res.json({ news });
  } catch (error) {
    console.error('Error getting news: ', error);
    res.status(500).json({ error: 'Failed to retrieve news' });
  }
});

router.post('/add', isAdmin, async (req, res) => {
  try {
    const newsData = req.body;
    const result = await addNews(newsData);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding news: ', error);
    res.status(500).json({ error: 'News addition failed' });
  }
});

module.exports = router;
