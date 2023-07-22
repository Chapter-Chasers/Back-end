'use strict'

const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const {BOOKS_API_URL} = require('../../../config');

//localhost:3000/allBooks
router.get('/allBooks', async (req, res, next) => {
    try {
        let axiosResponse = await axios.get(`${BOOKS_API_URL}get`)
        //res.send(axiosResponse.data.results)
        let books = axiosResponse.data;
    
        res.send(books)
    } catch (e) {
        next('Failed to get all books' + e)
    }


})
//localhost:3000/search?search=bookName
router.get('/search', async (req, res, next) => {
    try {
        let bookName = req.body.title;
        let axiosResponse = await axios.get(`${BOOKS_API_URL+bookName}`)
        let search = axiosResponse.data;
        res.send(search)

    } catch (e) {
        next('Cannot find book' + e)
    }
})




module.exports = router;