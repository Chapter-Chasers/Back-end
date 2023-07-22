const axios = require('axios');
const express = require('express');
const cors = require('cors');
const data = require('./BooksData/data.json')
const app = express();
const mainRoutes = require('./routes/mainRoute');
const bookRoutes = require('./routes/booksApi/book.routes');

require('dotenv').config();
app.use(cors());
const port = process.env.PORT;

app.use(express.json())
app.use(mainRoutes);
app.use(bookRoutes);

// app.get('/moh',(req,res)=>{
//     try {
//         res.send('inside moh')
//     } catch (error) {
//         console.log(`error is ${error}`);
//     }
// })


app.listen(port, () => {
    console.log(`server runs on ${port}`);
})