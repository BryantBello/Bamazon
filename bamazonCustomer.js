var mysql = require('mysql');
var prompt = require('prompt');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'stalker',
	database: 'bamazon'
});


con.connect(function(err){
	if (err){
		console.log(err);
	}
		console.log('connected');
});


prompt.start();



//First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale

con.query("SELECT * FROM bamazon WHERE itemID= <= 1000" , function(err, rows) {
        if (err) {
            return callback(err);
        }


//Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.
 prompt.get()


//Check if your store has enough quantity of the product to meet the customer's request. If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.




//If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.
