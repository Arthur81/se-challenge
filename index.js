var express = require('express');
var index = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

// using express.static middleware to serve up the static files in our public/ directory
index.use(express.static(path.join(__dirname, 'public')));

// Whenever there is a request to server we respond with showing index.html
index.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Creating upload/ route to handle and store incoming data for now
index.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    // Renaming in the file system
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

// Start the nodeJS server and start parsing the data from the uploads
var server = index.listen(3000, function(){
  console.log('Server listening on port 3000');
});