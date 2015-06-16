// Requires the http module that ships with Node
var http = require('http');
// Requires the url module that ships with Node
var url = require("url");
// Require the formidable library - installed via npm
var formidable = require("formidable");

function start(route, handle){
  // This is a function that this module offers
  // Returns an object that has a method called listen
  http.createServer(function(request, response){

    var postData = "";

    // Get the url string requested by the user
    var pathname = url.parse(request.url).pathname;

    console.log("Request for " + pathname + " received");

    // Define what we expect the encoding of the received data to be
    request.setEncoding("utf8");

    // Add event listener to save Data being passed to server
    request.addListener("data", function(postDataChunk){
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    // Send the postData to our router
    request.addListener("end", function(){
      route(handle, pathname, response, postData);
    });

    // Call the function passed in (route) on the pathname we just parsed and pass in our handle object
    // var content = route(handle, pathname, response);

    // Send an HTTP status 200 and content type in the HTTP response header
    // response.writeHead(200, {"Content-Type": "text/plain"});

    // Send text in HTTP response body
    // response.write(content);

    // Finish response
    // response.end();

  // Pass in the port number you want your server on
  }).listen(8888);
}
exports.start = start;