'use strict'

const express = require('express');
const router = express.Router();
const axios = require('axios');

const { QOUTEPAGE_API_URL } = require('../../../config');

//localhost:3000/allQuotes
router.get('/allQuotes', async (req, res) => {
    try {
        const response = await axios.get(process.env.QOUTEPAGE_API_URL);
        const quotes = response.data;
        res.status(200).json(quotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({ error: 'An error occurred while fetching quotes.' });
      }
  });


module.exports = router;