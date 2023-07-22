const express = require('express');
const cors = require('cors');
const app = express();
const mainRoutes = require('./routes/mainRoute');
const qouteRoutes = require('./routes/api_routes/qoute_generator/api');

require('dotenv').config();
app.use(cors());
const port = process.env.PORT;

app.use(mainRoutes);
app.use(qouteRoutes);
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