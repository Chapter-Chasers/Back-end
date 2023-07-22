const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const mainRoutes = require('./routes/mainRoute');

require('dotenv').config();
app.use(cors());
const port = process.env.PORT;

app.use(mainRoutes);

// app.get('/moh',(req,res)=>{
//     try {
//         res.send('inside moh')
//     } catch (error) {
//         console.log(`error is ${error}`);
//     }
// })


app.listen(port,() => {
    console.log(`server runs on ${port}`);
})