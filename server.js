'use strict'

const express = require('express');
const cors = require('cors');

const app = express();
const mainRoutes = require('./routes/mainRoute');

const bookRoutes = require('./routes/api_routes/booksApi/book.routes');

const qouteRoutes = require('./routes/api_routes/qoute_generator/api');


const pageNotFoundHandler = require('./routes/errorHandlers/404')
const serverErrorHandler = require('./routes/errorHandlers/500')

app.use(cors());

const {PORT} = require('./config');

app.use(express.json())
app.use(mainRoutes);
app.use(bookRoutes);
app.use(qouteRoutes);


app.use(pageNotFoundHandler);
app.use(serverErrorHandler);

// app.get('/moh',(req,res)=>{
//     try {
//         res.send('inside moh')
//     } catch (error) {
//         console.log(`error is ${error}`);
//     }
// })


app.listen(PORT, () => {
    console.log(`server runs on ${PORT}`);
})