var mysql = require('mysql');
var prompt = require('prompt');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '***', //password hidden for upload to git
    database: 'bamazon'
});


//CONNECT TO MYSQL DATABASE

con.connect(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Connection to database is complete');
});




//Display items and prompt user to select from list

var productMenu = function() {

    con.query("select * from products", function(err, products) {
        if (err) {
            return err;
        };

        for (var i = 0; i < products.length; i++) {
            console.log('Item ID: ' + products[i].ItemID + ' --' + ' Department: ' + products[i].DepartmentName + ' --' + ' Product: ' + products[i].ProductName + ' --' + ' Price: $' + products[i].Price);
            console.log('----------------------------------------------------------------------------');
        };
        //PROMPT USER TO GET ITEMS
        prompt.get(['ItemID', 'Quantity', 'Add_More (Yes or No)'], function(err, result) {

            //Show what the user has picked and how many
            console.log('ProductID: ' + result.ItemID);
            console.log('Quantity: ' + result.Quantity);

            //Loop through all of the products to see if product is in stock
            //Confirm that the item is in stock
            for (var i = 0; i < products.length; i++) {
                if (result.ItemID == products[i].ItemID) {
                    if (products[i].StockQuantity < result.Quantity) {
                        console.log('Sorry, we are currently out of ' + ProductName + ' please choose another product!');
                    }

                    //Get the total for the products selected	
                    var orderTotal = (result.Quantity * products[i].Price);
                    var newStockQuantity = (products[i].StockQuantity - result.Quantity);

                    //if item is in stock give the user their total
                    if (products[i].StockQuantity >= result.Quantity) {
                        console.log('Order total: $' + orderTotal)
                    };
                };


            };
            //UPDATA THE DATABASE
            con.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ItemID = " + result.ItemID + ";", function(err, products) {
                if (err) {
                    return console.log(err);
                }
                if (result.Add_More == 'Yes') {
                    productMenu();
                } else {
                    console.log('Thank you! Your order is complete. Have a wonderful day!!');
                    process.exit();
                };
            });



        });

    });
}

console.log('Thank you for choosing to shop with Bamazon!!! Please choose a product from the products displayed:  ');
productMenu();
