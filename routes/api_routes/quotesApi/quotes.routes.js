'use strict'

const express = require('express');
const router = express.Router();
const axios = require('axios');

const { QOUTEPAGE_API_URL } = require('../../../config');
const client = require('../../../clint');

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

router.post('/addQuotes', async (req, res, next) => {
  try {
    const { id, author, qoute } = req.body;
    const sql = "insert into quotes (userid , author , quote) values ($1 , $2 , $3)";
    client.query(sql, [id, author, qoute]).then(() => {
      res.status(201).send("successfully created quote")
    }).catch((e) => {
      next(`error is ${e}`)
    })
  }
  catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'An error occurred while fetching quotes.' });
  }
});



module.exports = router;