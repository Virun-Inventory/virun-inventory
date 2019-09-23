
/**
 * Name: Michael Burdi
 * Description: This is a script for generating mock inventory data
 * Date: 09-21-2019
 */

const casual = require('casual');
const fs = require("fs");

/** Define a scheme for the data. */
casual.define('product', function() {
    return {
        _id: casual.uuid,
        name: casual.title,
        part_number: casual.card_number,
        received: casual.integer(0, 800),
        on_hand: casual.integer(0, 1000),
        minimum_required: casual.integer(0, 100)
    };
});

/** Make 50 of them. */
let data = [];
for (let i = 0; i < 50; i++) {
    data.push(casual.product);
}

/** Output to a json file. */
fs.writeFileSync("./models/inventory.json", JSON.stringify(data, null, 2));
