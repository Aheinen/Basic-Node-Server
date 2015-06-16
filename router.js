function route(handle, pathname, response, postData){
  console.log("About to route a request for " + pathname);

  // Check to make sure the pathname is a handle we have set up, if so we call the function
  if (typeof handle[pathname] === 'function'){

    // If we hit a legitimate route, we pass our response handling off to our requestHandlers
    return handle[pathname](response, postData);
  }

  // else log that there is no route with that name
  else {
    console.log("No request handler found for " + pathname);

    // Moved all of our response handling to the router
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}
exports.route = route;