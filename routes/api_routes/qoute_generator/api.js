const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router()

const url = process.env.QOUTE_API_URL

router.get('/qoute', async (req, res, next) => {
    try {
        const axioRes = await axios.get(url);
        res.send(axioRes.data);
    } catch (error) {
        next(`Qoute handler ${error}`)
    }
})


module.exports = router