// Made by Raunak Sudhakar, as ViZrdLabs.

// You need two devices to run it.
// Demo
// "Controller" on: https://fireburst.herokuapp.com/
// "Screen" on: https://fireburst.herokuapp.com/screen/
// Allows multiple devices as "controllers"
// to send "Fireworks" to the "Screen".

// Three main apps -
// The server App ("Server") (this file)
// The User App ("Controller")
// The Client App ("Screen")

// This is a Node Js Program that uses "Express", "Socket io"
// https://expressjs.com/
// "Express is a minimal and flexible
// Node.js web application framework
// that provides a robust set of features
// for web and mobile applications."
// (Like Making an API Server.)

// socket.io/
// Socket.IO enables real-time,
// bidirectional and event-based communication.
// It works on every platform, browser or device,
// focusing equally on reliability and speed.
// (We use this to "Emit" a signal everytime
// an API call is made to this server)

// Intitialize "Express"
const express = require("express");
const app = express();

// process.env.PORT is when it's hosted online.
// 9000 is when it's in developement/ localmachine:9000
var server = app.listen(process.env.PORT || 9000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://" + host + ":" + port);
}

// Host a Folder Called "public" and serve all the files within.
app.use(express.static("public"));

// Add a json parser
app.use(express.json());

// WebSocket Portion
// WebSockets work with the HTTP server
// server-side
// Since the "User" app is also on the same server,
// the CORS stuff below should be necessary,
// but if the user app is on a different server,
// you'll need the stuff below. (I think.)
const io = require("socket.io")(server, {
  cors: {
    origin: "localhost:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  //   {transports: ['websocket']}
});

// This is where we combine the API (express) and Websockets (Socket io)
// We create an API, at "/api",
// with a call back function that receives the request
app.post("/api", (request, res) => {
  // For every API call we recieve, we "emit" a signal
  // called "mouse" to the "Client" app, which in our
  // case is the  "Screen". It also sends the data sent from the
  // "user" app (Hue & Saturation) to the "client" app ("screen").
  io.emit("mouse", request.body);
  // Console log the colours chosen by the user.
  console.log(request.body);
  // If there is no response sent, the browser will stop
  // sending anymore requests are 6 attempts or so.
  // this line below sends out a response of "done". Will
  // work with "" as well.
  res.end("done");
});

// This is how you may create a "GET" request, where the user
// asks for some data and you can send it back. (I THINK)
// At present it is not in use.
app.get("/api", (request, response) => {
  console.log(request.body);
});

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);

    // // When this user emits, client side: socket.emit('otherevent',some data);
    // socket.on("mouse", function (data) {
    //   // Data comes in as whatever was sent, including objects
    //   console.log("Received: 'mouse' ");
    //   // console.log("Received: 'mouse' " + data.x + " " + data.y);

    //   // Send it to all other clients
    //   socket.broadcast.emit("mouse");

    //   // This is a way to send to everyone including sender
    //   // io.sockets.emit('message', "this goes to everyone");
    // });

    socket.on("disconnect", function () {
      console.log("Client has disconnected");
    });
  }
);
