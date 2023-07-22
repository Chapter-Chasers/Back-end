const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router()
const { QOUTE_API_URL } = require('../../../config');


router.get('/qoute', async (req, res, next) => {
    try {
        const axioRes = await axios.get(QOUTE_API_URL);
        res.send(axioRes.data);
    } catch (error) {
        next(`Qoute handler ${error}`)
    }
})


module.exports = router