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
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
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
console.log(interests)
const InterestArray = interests.split(' ')
console.log(InterestArray)
  //edge cases if some fields are missing 
    if(!name||!email||!password||!gender||!age||!location||!interests||!relationshipGoals||!image){
      return res.status(400).json({message:"All fields are required"})
    }
      let ImageUrl = "none";
    if(image){
      // Image = await uploadToFirebase(image);
      // console.log(Image)
    }

    // Hash the user's password before storing it
    const hashedPassword = await  bcrypt.hash(password, 10);


    // Insert user details into the database
    const InsertQuery = `INSERT INTO userdata (name, email, password, gender, age, location, interests, relationship_goals, imageUrl) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`
    const result = await client.query(InsertQuery,
      [name, email, hashedPassword, gender, age, location, InterestArray, relationshipGoals, ImageUrl]
    );

    // Create a JWT token for the newly registered user
    const token = jwt.sign({ id: result.rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
 console.log(result.rows[0])
    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user.' });
  }
};




// User Login
const Login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
  console.log(req.body);
    // Check if the user exists in the database
    const result = await client.query('SELECT * FROM userdata WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password.' });

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in.' });
  }
};

// Forgot Password
const ResetPassword =  async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

    // Create a password reset token that expires in 15 minutes
    const resetToken = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Here, you would send the reset token via email (implementation not included)

    res.status(200).json({ message: 'Password reset link has been sent to your email.', resetToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing forgot password request.' });
  }
};

// Welcome Message Endpoint
const WelcomeMessage = (req, res) => {
  res.status(200).json({ message: 'Welcome to the platform! Start with the Match Chemistry Quiz to find your best matches.' });
};

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on https://localhost:${PORT}`);
// });

exports.data = {verifyToken,ResetPassword,Login,Register,WelcomeMessage,upload}