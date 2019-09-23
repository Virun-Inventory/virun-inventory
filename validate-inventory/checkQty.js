//load in mockPO to local var from mockPO.json
const fs = require('fs');

let rawdata = fs.readFileSync('mockPO.json');
let mockPO = JSON.parse(rawdata);
//** MOCK PO NOT USED IN THIS ITERATION OF PROGRAM**

//total ingredients to be checked with inventory
//mockList to be updated with a functional form in future iteration
let totalIngredientCount = [
    ["9e052f15", 22],
    ["d09ea3a4", 21],
    ["6cfe3ef6", 32]
];

//main function to check if inventory can handle totals required by
//totalIngredientsCount list
//called by getScript function below
function checkQty(data, po) {
    let restockList = [];
    for(let lineItem of po) {
        for(let inventoryItem of data){
            if(lineItem[0] == inventoryItem._id.slice(0,8)){
                if(inventoryItem.received - lineItem[1] < 0){
                    restockList.push(lineItem[0]);
                }
            }
        }
    }
    if(restockList.length != 0) {
        console.log("Not enough inventory to process PO"); 
        for(let item of restockList) {
            console.log("Item #" + item + ": does not have enough inventory to continue.");
        }
        return;
    }
    console.log("Order successful. Updated inventory! (not really)");
}

//goes to http://35.165.7.53:3000/inventory to get all data from page
//
const getScript = (url) => {
    return new Promise((resolve, reject) => {
        const http = require('http'),
              https = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Now can call our function
            //to check if inventory has enough material to process PO
            resp.on('end', () => {
                //var 'parsedData' holds all the data from http://35.165.7.53:3000/inventory
                //as an object
                let parsedData = JSON.parse(data);
                //calls main checkQty function with the parsed data from url and our 
                //totalIngredientCount list
                checkQty(parsedData, totalIngredientCount);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

(async (url) => {
    console.log(await getScript(url));
})('http://35.165.7.53:3000/inventory');
