/*
Revieve's tech test - task 2
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
var productCustomersTable = [["id", "customer_ids"]];
// Extract output data
for (let i = 1; i < productsTable.length; i++) {
    if (productsTable[i][0] !== "") {
        // Add products
        productCustomersTable.push([productsTable[i][0], []]);
        len = productCustomersTable.length;
        // Iterate through orders
        for (let j = 1; j < ordersTable.length; j++) {
            // Iterate through order's products
            for (let k = 0; k < ordersTable[j][2].length; k++) {
                if ((productsTable[i][0] === ordersTable[j][2][k]) && !(productCustomersTable[len - 1][1].includes(ordersTable[j][1]))) {
                    // Add relevant customer ids
                    productCustomersTable[len - 1][1].push(ordersTable[j][1]);
                }
            }
        }
    }
}

// Join customers sub-array for proper outputting
for (let l = 1; l < productCustomersTable.length; l++) {
    productCustomersTable[l][1] = productCustomersTable[l][1].join(" ");
}

// Output file
require('fs').writeFile('product_customers.csv', storeTableStr(productCustomersTable), err => {
  if (err) {
    console.error(err);
  }
});