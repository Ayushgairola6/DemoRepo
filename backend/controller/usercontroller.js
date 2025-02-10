// const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const openpgp = require('openpgp');
const dotenv = require('dotenv');
const fs = require('fs');
const client = require("../db.js")
const { uploadToFirebase, deleteImage } = require('./FirebaseConfig/FirebaseAdmin.js')

// multer for handling image parsing
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 5 } })

dotenv.config();

// Assuming you're reading the private key file
const privateKey = fs.readFileSync('private.key', 'utf8');

// HTTPS server configuration
const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('cert.pem'),
};

// Initialize Express app
// const app = express();
// app.use(express.json());

// PostgreSQL database connection
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET,(err,data)=>{
      if(err) throw new Error("Unauthorized")

    req.user = data;;

    });
    next();
  } catch (err) {
    throw  err;
  }
};

// Encrypt data using OpenPGP
const encryptData = async (data) => {
  const publicKeyArmored = process.env.PUBLIC_KEY;
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: JSON.stringify(data) }),
    encryptionKeys: publicKey,
  });

  return encrypted;
};

// User Registration
const Register  = async (req, res) => {
 
  try {
    
     const { name, email, password, gender, age, location, interests, relationshipGoals } = req.body;
const image = req.file
// console.log(interests)
const InterestArray = interests.split(' ')
// console.log(Array(interests))
  //edge cases if some fields are missing 
    if(!name||!email||!password||!gender||!age||!location||!interests||!relationshipGoals||!image){
      return res.status(400).json({message:"All fields are required"})
    }
      let ImageUrlArray = [];
    if(image){
      Image = await uploadToFirebase(image);
      console.log(Image)
      ImageUrlArray[Image];
    }
     ImageUrlArray= ['{thereisnoimageforthisuser}'];
    // Hash the user's password before storing it
    const hashedPassword = await  bcrypt.hash(password, 10);
    


    // check if the user already exists

    const Check = `SELECT * FROM users WHERE email = $1`;
    const USER = await client.query(Check,[email]);
 
    if(USER.rows.length>0){
      console.log("user already exists")
      return res.status(400).json({message:"User already exists"});
    }
  

    // Insert user details into the database
    const InsertQuery = `INSERT INTO users (name, email, hashed_password, gender, age, location, interests, relationship_goals, images) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9::TEXT[]) RETURNING id`
    const result = await client.query(InsertQuery,
      [name, email, hashedPassword, gender, age, location, InterestArray, relationshipGoals, ImageUrlArray]
    );

    


    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user.' });
  }
};




// User Login
const Login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

// verifying the password 
    const user = result.rows[0];
    console.log(user);
    // const isPasswordValid = await bcrypt.compare(password, user.hash_password);
    // if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password.' });

   // Create a JWT token for the newly logged in user
    const token = jwt.sign({ id: result.rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in.' });
  }
};

// Forgot Password
const ResetPassword =  async (req, res) => {
  // email and password are necessary are neccessary so that we can store it in the db
  try {
  const { email ,newpassword} = req.body;

  if(!email || !password){
    return res.status(400).json("All fields are mandatory");
  }

    // Check if the user exists
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

    
// if the user exists update his password in the database

const UpdatedPassword = bcrypt.hash(newpassword,10);


// update the user in the database

const Update = await client.query("UPDATE users SET password = $1 WHERE email = $2",[UpdatedPassword,email])

if(Update.rows.length === 0){
  return res.status(400).json({message:"error while updating your password"})
}

    // Create a password reset token that expires in 15 minutes
    // const resetToken = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Here, you would send the reset token via email (implementation not included)

    res.status(200).json({ message: 'You can login now', resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing forgot password request.' });
  }
};

// Welcome Message Endpoint
const WelcomeMessage = (req, res) => {
  return res.status(200).json({ message: 'Welcome to the platform! Start with the Match Chemistry Quiz to find your best matches You are good to go.' });
};

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });

exports.data = {verifyToken,ResetPassword,Login,Register,WelcomeMessage,upload}