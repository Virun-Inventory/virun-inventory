
const express = require('express');
const router = express.Router();

let products = require('../models/inventory');

router
    /** GET order form */
    .get('/', (req, res) => {
        res.render('pages/order/new-order', {products});
    })
    /** POST order */
    .post('/', (req, res) => {
        res.redirect('/order');
    });


module.exports = router;
