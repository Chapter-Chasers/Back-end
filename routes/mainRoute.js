const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        console.log(`inside /`);
        res.send('Hello');
    } catch (error) {
        console.log(`error is ${error}`);
    }
})


module.exports = router;