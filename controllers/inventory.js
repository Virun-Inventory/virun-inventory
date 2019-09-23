
const inventoryData = require('../models/inventory');

exports.getInventory = function (req, res, next) {
    res.send(inventoryData);
};
