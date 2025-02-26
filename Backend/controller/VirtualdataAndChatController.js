const jwt = require("jsonwebtoken");
const jwt_secret = "12345";
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

// this middleware will extract the userId of sender from the headers token and attach it to the socket object
io.use((socket, next) => {

  // token sent via socket instance
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.userId = decoded.id; 
      next();
    });
  }
  else {
    next(new Error("Authentication error"));
  }
});



// socket instance object
io.on("connection", (socket) => {
  const {user2} = socket;
  console.log(`User ${socket.userId} connected` to the socket);
  // sendmessage event which is triggered when the user sends the text



  socket.on("sendMessage", (data) => {
    const { user2Id, message } = data; io.to(user2Id).emit("receiveMessage", { from: socket.userId, message: message });
  });
  socket.on("joinRoom", (user2Id) => { socket.join(user2Id); });
});


io.on("disconnect",()=>{
  console.log("user has disconnected from the socket");
})

// socket listening at port
httpServer.listen(6000, () => {
  console.log("Server is listening on port 3000");
});