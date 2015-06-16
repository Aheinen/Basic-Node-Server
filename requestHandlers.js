// This module allows us to to take advantage of a non-blocking operation called 'exec'
var exec = require("child_process").exec;

var querystring = require("querystring");
var rest = require("restler");
fs = require("fs");

// Allows us to wire the request handlers into the router, giving our router something to route
function questions(response, postData) {
  console.log("Request handler 'questions' was called.");

  // Executes a shell command from within Node
  // exec("la -lah", function(error, stdout, stderr){
  //   response.writeHead(200, {"Content-Type": "text/plain"});
  //   response.write(stdout);
  //   response.end();
  // });

  // Generate static HTML skeleton
  var body = '<html>'+
      '<head>'+
          '<meta http-equiv="Content-Type" content="text/html; '+
          'charset=UTF-8" />'+
      '</head>'+
      '<body>';

  // Make a get request to my Rails server
  rest.get('http://localhost:3000/questions/').on('complete', function(result){

    // Error handling
    if (result instanceof Error) {
      console.log('Error:', result.message);
      this.retry(5000);
    }
    else {

      // Loop through results, add each object to the body
      for (var i = 0; i < result['questions'].length; i += 1){
        body = body + ("<h3>" + result['questions'][i]['sum_votes'] + "</h3>");
        body = body + ("<h3>" + result['questions'][i]['title'] + "</h3>");
      }
    }
    body = body + '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});

    // Write body to the DOM
    response.write(body);
    response.end;
  });
  // Building a form for us to send requests
  // var body = '<html>'+
  //     '<head>'+
  //         '<meta http-equiv="Content-Type" content="text/html; '+
  //         'charset=UTF-8" />'+
  //     '</head>'+
  //     '<body>'+
  //       '<form action="/upload" method="post">'+
  //         '<textarea name="text" rows="20" cols="60"></textarea>'+
  //         '<input type="submit" value="Submit text" />'+
  //     '</body>'+
  //   '</html>';

}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent: " + querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file){
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    }
    else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.questions = questions;
exports.upload = upload;
exports.show = show;