const express = require('express');
const axios = require('axios');
const router = express.Router()
const { QOUTE_API_URL } = require('../../../config');


router.get('/quote', async (req, res, next) => {
    try {
        const axioRes = await axios.get(QOUTE_API_URL);
        res.status(200).send(axioRes.data);
    } catch (error) {
        next(`Qoute handler ${error}`)
    }
})


module.exports = router