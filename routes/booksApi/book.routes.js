const express = require('express');
const router = express.Router();
const axios = require('axios');

//acces booksdata folder
const data = require('../../BooksData/data.json')

//constructor
function Book() {
   
  }

//localhost:3000/allBooks
router.get('/allBooks', async (req, res, next) => {
    try {
        let axiosResponse = await axios.get(`${process.env.BOOKS_API_URL}`)
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
        let bookName = req.query.search;
        let axiosResponse = await axios.get(`${process.env.BOOKS_API_URL}/&query=${bookName}`)
        let search = axiosResponse.data;
        res.send(search)

    } catch (e) {
        next('Cannot find book' + e)
    }
})




module.exports = router;