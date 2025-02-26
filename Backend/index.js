const express= require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const feed_Router = require("./Routers/FeedRouter");
const User_Router = require("./Routers/UserRouter");
const {PaymentRouter} = require('./Routers/PaymentRouter')
const chatRouter = require("./Routers/ChatRouter");
const {quizRouter} = require("./Routers/QuizRouter")
// importing tables
const LikeTable = require('./Model/Likestable');
const matchTable = require('./Model/Matchestable');
const preference = require("./Model/PreferenceTable");
const {createMediaTable} = require("./Model/MediaTable");
const {createUsersTable} = require("./Model/UsersTable");
require('./Model/MatchQuizTables')
require("./Model/chatsTable")
// require("./Query.js")
// intialization of tables
createUsersTable()
LikeTable.table.CreateLikeTable();
matchTable.table.creatematchTable();
 preference.table.CreatePreferenceTable();

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
app.listen(8080,'localhost',()=>{
	console.log("server connected")
})
