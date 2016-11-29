// Back end server for the web app
// This is also where we would like to first establish connection to 
// a relational data base such as MySQL on Linux environment

// Frameworks used - assuming these modules are already installed as per
// software build instructions
var express = require('express');
var mysql = require('mysql');
var app = express();

// Now create a pool of conections to connect to mysql
var connection = mysql.createPool({
// All the properties of pool goes here
    // Limiting
    connectionLimit: 50, // 50 connection queries at a time
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampleDB'
});

// Creating a route with 50 queries or connections at a time set as limit
app.get('/wavewebapp', function (req, resp) {

    // About mysql
    console.log('Server was listening on port 1337');
    // Call back so whenever the query is done, this function would fire
    connection.getConnection( function(error, tempConnection) {
        // The tempConnection variable will be used instead of teh connection varibale above as temporary (since we have pooled the connetion queries)
        if (!!error) {
            // In order to reduce stress on the main app server we release temp connections after use or error
            tempConnection.release(); // to release the connection
            console.log('Error in the query connection');
        } else {
            console.log('Query connection Successful!');
            
            tempConnection.query("SELECT * FROM mySampleTabe", function(error, rows, fields) {
                // When the query is done we no longer need the connection, so we release it
                tempConnection.release(); // to release the connection
                if (!!error) {
                    console.log('Error in the query connection');
                } else {
                    // sending it as a json instead of as an object
                    resp.json(rows);
                }
            })
        }
    });
})

/*
For simply looping through data use
for (var i = 0; i < rows.length; i++) {
  console.log(rows[i].name);
};

*/

app.listen(1337);