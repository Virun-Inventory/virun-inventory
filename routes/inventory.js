
const express = require('express');
const router = express.Router();

let inventory = require('../models/inventory');

router
/** GET order form */
    .get('/', (req, res) => {
        res.render('pages/inventory', {inventory});
    });


module.exports = router;
