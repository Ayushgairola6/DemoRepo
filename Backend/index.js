const express= require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser")
const httpServer = http.createServer(app);
const {Server} = require("socket.io");
require("dotenv").config();
const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
}); 
module.exports = {io,httpServer};

// importing Routes
const feed_Router = require("./Routers/FeedRouter");
const User_Router = require("./Routers/UserRouter");
const {PaymentRouter} = require('./Routers/PaymentRouter')
const chatRouter = require("./Routers/ChatRouter");
const {quizRouter} = require("./Routers/QuizRouter")
// importing tables
const userTable = require("./Model/UsersTable");
const LikeTable = require('./Model/Likestable');
const matchTable = require('./Model/Matchestable');
const {createMediaTable} = require("./Model/MediaTable");
const preference = require("./Model/PreferenceTable");

// require("./Query.js")
// intialization of tables
userTable.data.createUsersTable()
 preference.table.CreatePreferenceTable();
 LikeTable.table.CreateLikeTable();
matchTable.table.creatematchTable();
require('./Model/MatchQuizTables')
require("./Model/chatsTable")
// cors to establish a connection between front end and backend
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// Parse application/x-www-form-urlencoded app.use(bodyParser.urlencoded({ extended: false })); 
 app.use(bodyParser.json());
 

 
 // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false}));
// getting the server access to the routes
app.use(feed_Router.route.FeedRouter);
app.use(User_Router.Route.UserRouter);
app.use(PaymentRouter);
app.use(quizRouter);
app.use(chatRouter.route.ChatRouter)

// Create an HTTP server




// listen the server at port 8080
 httpServer.listen(process.env.PORT,'0.0.0.0',()=>{
	console.log("server connected")
})

