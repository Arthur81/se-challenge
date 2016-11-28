// Back end server for the web app
// This is also where we would like to first establish connection to 
// a relational data base such as MySQL on Linux environment

// Frameworks used - assuming these modules are already installed as per
// software build instructions
var express = require('express');
var mysql = require('mysql');
var app = express();

// Now create a conection to connect to mysql
var connection = mysql.createConnection({
// All the properties...
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampleDB'
});

// Establish connection by invoking connect and making sure you are connected to the database or not
connection.connect(function (error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected!');
        console.log('Server listening on port 1337');
    }
});

// Creating a route as well
app.get('/login', function (req, resp) {

    // About mysql
    // connection.query("SQL Querry")
    connection.query("SELECT * FROM mySampleTabe", function(error, rows, fields) {
        // Call back so whenever the query is done, this function would fire
        if (!!error) {
            console.log('Error in the Query');
        } else {
            console.log('Query Successful!');
            // Now testing some data access
            console.log(rows[0].Name);
            // parse with your rows/fields
            
            // sample response to user or client
            resp.send('Hello user:, ' + rows[0].Name);
        }
    });
})

app.listen(1337);