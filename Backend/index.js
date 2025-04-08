const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser")
const httpServer = http.createServer(app);
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://luvlens.netlify.app","https://luvlense.com","www.luvlense.com","http://luvlense.com"],
    credentials: true,
  },
});





//auth middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies["auth-token"];
  const authHeader = req.headers.authorization;
  const fallbackToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  const finalToken = token || fallbackToken; // Use cookie token first, fallback to header token

  if (!finalToken) {
    return res.status(400).json({ message: "No auth token found" });
  }

  jwt.verify(finalToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Internal Server error" });
      }
    }
    req.user = decoded;
    next();
  });
};



module.exports = { io, httpServer, verifyToken };

// importing Routes
const feed_Router = require("./Routers/FeedRouter");
const User_Router = require("./Routers/UserRouter");
const { PaymentRouter } = require('./Routers/PaymentRouter')
const chatRouter = require("./Routers/ChatRouter");
const { quizRouter } = require("./Routers/QuizRouter")
const ReviewRouter = require("./Routers/ReviewRouter");
const {PostRouter} = require("./Routers/PostsRouter");
// importing tables
const userTable = require("./Model/UsersTable");
const LikeTable = require('./Model/Likestable');
const matchTable = require('./Model/Matchestable');
const { createMediaTable } = require("./Model/MediaTable");
const preference = require("./Model/PreferenceTable");
const {CreateReviewTable} = require("./Model/reviewsTable")
const {createPostsTable} = require("./Model/PostsTable");

// cors to establish a connection between front end and backend only two domains
//  have been given the access to communicate with this api
const allowedOrigins = [
  "http://localhost:5173",
  "https://luvlens.netlify.app",
   "https://luvlensebackend.onrender.com",
   "https://www.luvlense.com",
   "https://luvlense.com",
   "http://luvlense.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie'], // Important for some clients
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add OPTIONS
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// getting the server access to the routes
app.use(feed_Router.route.FeedRouter);
app.use(User_Router.Route.UserRouter);
app.use(ReviewRouter.route.ReviewRouter);
// app.use(PaymentRouter);
app.use(quizRouter);
app.use(chatRouter.route.ChatRouter)
app.use(PostRouter);



// listen the server at port 8080
httpServer.listen(process.env.PORT, '0.0.0.0', () => {
  console.log("server connected")
})

