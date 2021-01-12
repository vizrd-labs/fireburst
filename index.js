// const cors = require("cors");
const express = require("express");
const app = express();
// app.listen(3410, () => console.log("Listening on 3410"));

// app.use(cors({ origin: true, credentials: true }));
var server = app.listen(process.env.PORT || 9000, listen);
// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://" + host + ":" + port);
}

app.use(express.static("public"));
app.use(express.json());
// app.use(cors());
// app.options("*", cors());

// WebSocket Portion
// WebSockets work with the HTTP server
// var io = require("socket.io")(server);
// server-side
const io = require("socket.io")(server, {
  cors: {
    origin: "localhost:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  //   {transports: ['websocket']}
});

app.post("/api", (request, res) => {
  io.emit("mouse", request.body);
  console.log(request.body);
  res.end("done");
});
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
