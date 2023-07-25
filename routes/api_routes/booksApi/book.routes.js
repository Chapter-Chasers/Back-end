'use strict'

const express = require('express');
const router = express.Router();
const axios = require('axios');


const { BOOKS_API_URL } = require('../../../config');

//localhost:3000/allBooks
router.get('/allBooks', async (req, res, next) => {
    try {
            let axiosResponse = await axios.get(`${BOOKS_API_URL}?q=Game`)
        //res.send(axiosResponse.data.results)
        let books = axiosResponse.data;

        res.status(200).send(books)
    } catch (e) {
        next('Failed to get all books' + e)
    }
})
//localhost:3000/search?search=bookName
router.get('/search', async (req, res, next) => {
    try {
        const bookName = req.query.title || req.query.isbn;
        const axiosResponse = await axios.get(`${BOOKS_API_URL + encodeURIComponent(bookName)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})
router.get('/searchAuthor', async (req, res, next) => {
    try {
        const { author } = req.query;
        const axiosResponse = await axios.get(`${BOOKS_API_URL}inauthor:${encodeURIComponent(author)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})

router.get('/searchCategory', async (req, res, next) => {
    try {
        const { cat } = req.query;
        const axiosResponse = await axios.get(`${BOOKS_API_URL}subject:${encodeURIComponent(cat)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})
module.exports = router;