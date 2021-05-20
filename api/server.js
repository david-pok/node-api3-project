const express = require("express");
const morgan = require("morgan");

const server = express();
const { logger } = require("./middleware/middleware");
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

//morgan is a commercial middleware that creates a console log
//that tells us about a request object
// server.use(morgan("dev"));

//this is a custom middleware that does pretty much
//what morgan does
// server.use((req, res, next) => {
//   console.log("the path is: ", req.path);
//   next();
// });

//we will use our own custom middlewares in a different file
//for this project

// global middlewares and the user's router need to be connected here

server.use(logger);

server.get("/", (req, res) => {
  // throw new Error("DISASTER ERROR"); //use this to test error catches
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//error handling middleware that will catch errors that come
//before it does
server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message, //dev only
    stack: err.stack, //dev only
    custom: "something went terrible", //simple error message for production
  });
});

module.exports = server;
