/*
Revieve's tech test - task 1
31/5/2022
Frederico Dantas
*/

// Converts csv into array (for easier manipulation)
function storeTableArr(csvTablePath) {
    arr = require("fs").readFileSync(csvTablePath, "utf8");
    arr = arr.split("\r\n");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(",");
    };
    return arr;
}

// Converts array variable into csv string
function storeTableStr(tableArr) {
    str = tableArr;
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].join(",");
    };
    str = str.join("\r\n");
    return str;
}

// Store csv files in variables
var productsTable = storeTableArr("products.csv");
var ordersTable = storeTableArr("orders.csv");
for (let i = 1; i < ordersTable.length; i++) {
    if (String(ordersTable[i][2]).includes(" ")) {
        ordersTable[i][2] = ordersTable[i][2].split(" ");
    }
    else {
        ordersTable[i][2] = [ordersTable[i][2]];
    }
};

// Declare variable to store output data
var orderPricesTable = [["id", "euros"]];
// Extract output data
for (let i = 1; i < ordersTable.length; i++) {
    if (ordersTable[i][0] !== "") {
        // Add orders
        orderPricesTable.push([ordersTable[i][0], 0]);
        len = orderPricesTable.length;
        // Iterate through order's products
        for (let j = 0; j < ordersTable[i][2].length; j++) {
            // Iterate through products to get price
            for (let k = 1; k < productsTable.length; k++) {
                if (ordersTable[i][2][j] === productsTable[k][0]) {
                    // Sum product price to the order value
                    orderPricesTable[len - 1][1] = orderPricesTable[len - 1][1] + parseFloat(productsTable[k][2]);
                    break;
                }
            }
        }
    }
}

// Output file
require('fs').writeFile('order_prices.csv', storeTableStr(orderPricesTable), err => {
  if (err) {
    console.error(err);
  }
});