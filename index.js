// Pulling our server, router and requestHandlers in like we do a module
var server = require ("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

// Store these associations in an object - This way we don't have lots to change when adding new routes
var handle = {}
handle["/"] = requestHandlers.questions;
handle["/questions"] = requestHandlers.questions;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


// Start the server by calling a function available to the server file
server.start(router.route, handle);