'use strict'

const express = require('express');
const router = express.Router();
const axios = require('axios');


const { BOOKS_API_URL } = require('../../../config');

//localhost:3000/allBooks
router.get('/allBooks', async (req, res, next) => {
    try {
        const word = wordGenerator();
        let axiosResponse = await axios.get(`${BOOKS_API_URL + '?q=' + word}`)
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
        const axiosResponse = await axios.get(`${BOOKS_API_URL + '?q=' + encodeURIComponent(bookName)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})
router.get('/searchAuthor', async (req, res, next) => {
    try {
        const { author } = req.query;
        const axiosResponse = await axios.get(`${BOOKS_API_URL}?q=inauthor:${encodeURIComponent(author)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})

router.get('/searchCategory', async (req, res, next) => {
    try {
        const { cat } = req.query;
        const axiosResponse = await axios.get(`${BOOKS_API_URL}?q=subject:${encodeURIComponent(cat)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})
router.get('/search/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const axiosResponse = await axios.get(`${BOOKS_API_URL}/${encodeURIComponent(id)}`)
        res.status(200).send(axiosResponse.data)

    } catch (e) {
        next('Cannot find book' + e)
    }
})
const wordGenerator = () => {
    const words = [
        'Adventure',
        'Romance',
        'Mystery',
        'Thriller',
        'Science Fiction',
        'Fantasy',
        'Horror',
        'Drama',
        'History',
        'Biography',
        'Comedy',
        'Self-Help',
        'Cooking',
        'Travel',
        'Poetry',
        'Art',
        'Fiction',
        'Non-Fiction',
        'Memoir',
        'Classics',
        'Business',
        'Health',
        'Religion',
        'Spirituality',
        'Philosophy',
        'Politics',
        'Children',
        'Young Adult',
        'Graphic Novel',
        'Manga',
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

module.exports = router;