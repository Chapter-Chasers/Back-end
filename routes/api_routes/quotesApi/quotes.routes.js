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

  router.post('/addQuotes', async (req, res, next) => {
    try {
      const id= req.body.id;
      const author = req.body.author;
      const quote = req.body.quote;
       const sql= 'INSERT INTO quotes(userId,author,quote) VALUES ($1,$2,$3) ';
       clint.query(sql, [id,author,quote]).then(() => {
        res.status(201).send('quote added succcfuly :)'); 
      }).catch((error) => next("something went wrong" + error));

      } catch (error) {
       next(error)
      }
  });



module.exports = router;