'use strict'
const clint = require('./clint');
const express = require('express');
const cors = require('cors');

const app = express();
const mainRoutes = require('./routes/mainRoute');
const DB_routes = require('./routes/database/DB')
const bookRoutes = require('./routes/api_routes/booksApi/book.routes');

const qouteRoutes = require('./routes/api_routes/qoute_generator/api');
const emailRoute = require('./routes/database/emailsub')

const pageNotFoundHandler = require('./routes/errorHandlers/404')
const serverErrorHandler = require('./routes/errorHandlers/500')

app.use(cors());

const { PORT } = require('./config');
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(mainRoutes);
app.use(bookRoutes);
app.use(qouteRoutes);
app.use(DB_routes);
app.use(emailRoute);

app.use(pageNotFoundHandler);
app.use(serverErrorHandler);

clint.connect().then(() => {
    app.listen(PORT, () => {
        console.log(` ${clint.database}`);
        console.log(`started at PORT ${PORT}`)
    })
})

// app.listen(PORT, () => {
//     console.log(`server runs on ${PORT}`);
// })