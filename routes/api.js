const express = require('express');
const router = express.Router();

const Inventory = require('../controllers/inventory');

/* GET mock inventory listing */
router.get('/inventory', Inventory.getInventory);

module.exports = router;
