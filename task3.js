/*
Revieve's tech test - task 3
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
var customersTable = storeTableArr("customers.csv");
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
var customerRankingTable = [["id", "firstname", "lastname", "total_euros"]];
// Extract output data
for (let i = 1; i < customersTable.length; i++) {
    if (customersTable[i][0] !== "") {
        // Add orders
        customerRankingTable.push([customersTable[i][0], customersTable[i][1], customersTable[i][2], 0]);
        len = customerRankingTable.length;
        // Sum product prices to the customer's expenditure
        // Look for the customer's orders
        for (let j = 1; j < ordersTable.length; j++) {
            if (ordersTable[j][1] === customerRankingTable[len - 1][0]) {
                // Iterate through order's products
                for (let k = 0; k < ordersTable[j][2].length; k++) {
                    // Iterate through products to get price
                    for (let l = 1; l < productsTable.length; l++) {
                        if (ordersTable[j][2][k] === productsTable[l][0]) {
                            // Sum price to customer's expenditure
                            customerRankingTable[len - 1][3] = customerRankingTable[len - 1][3] + parseFloat(productsTable[l][2]);
                            break;
                        }
                    }
                }
            }
        }
    }
}

// Bubble sort in descending order
var allSorted = false;
while (!allSorted) {
    allSorted = true;
    for (let m = 1; m < customerRankingTable.length - 1; m++) {
        if (customerRankingTable[m][3] < customerRankingTable[m + 1][3]) {
            var a = customerRankingTable[m];
            customerRankingTable[m] = customerRankingTable[m + 1];
            customerRankingTable[m + 1] = a;
            allSorted = false;
        }
    }
}

// Output file
require('fs').writeFile('customer_ranking.csv', storeTableStr(customerRankingTable), err => {
  if (err) {
    console.error(err);
  }
});