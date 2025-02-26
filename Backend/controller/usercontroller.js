// const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const openpgp = require('openpgp');
const dotenv = require('dotenv');
const fs = require('fs');
const client = require("../db.js")
const { uploadFile } = require('./FirebaseConfig/FirebaseConfig.js')

// multer for handling image parsing
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 20 } })

dotenv.config();

// Assuming you're reading the private key file
const privateKey = fs.readFileSync('private.key', 'utf8');

// HTTPS server configuration
const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('cert.pem'),
};



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
    
     const { name, email, password } = req.body;
const image = req.file
// console.log(interests)
// console.log(Array(interests))
  //edge cases if some fields are missing


    if(!name||!email||!password||!image){
      return res.status(400).json({message:"All fields are required"})
    }


// check if the user already exists

    const Check = `SELECT * FROM users WHERE email = $1`;
    const USER = await client.query(Check,[email]);
 
    if(USER.rows.length>0){
      console.log("user already exists")
      return res.status(400).json({message:"User already exists"});
    }
    
      let ImageUrl=[];
    if(image){
      Image = await uploadFile(image,"images/");
      ImageUrl=[Image];
    }
     // ImageUrlArray= [thereisnoimageforthisuser];
    // Hash the user's password before storing it

    if(!ImageUrl || ImageUrl.length===0){
      return res.status(400).json({message:"Please try again later"})
    }
    const hashedPassword = await  bcrypt.hash(password, 10);
    



    
  

    // Insert user details into the database
    const InsertQuery = `INSERT INTO users (name, email, hashed_password,images) 
       VALUES ($1, $2, $3, $4) RETURNING id `
    const result = await client.query(InsertQuery,
      [name, email, hashedPassword,ImageUrl]
    );
       


    if(result.rows.length===0){
      return res.status(400).json({message:"error while creating and account , please try again"})
    }

   
    


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
 if(!email||!password){
  return res.status(400).json({message:"All fields are necessary"})
 }
    // Check if the user exists in the database
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

// verifying the password 
    const user = result.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
 
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password.' });

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


//function to upload media files like 5 images and videos


const UploadMedia = async (req,res)=>{
  try{
      const image = req.file;
      const video = req.file;
  }catch(error){
    throw error;
  }
}

// update profile related data;
const UpdateProfile =async(req,res)=>{
  try{

    const {about,age,location,interests,hobbies,relationShip,gender} = req.body;
   console.log(req.body)
    if (!about || !age || !location || !interests || !hobbies || !relationShip |!gender) {
            console.log("all fields are mandatory")
    return res.status(400).json({ message: "all fields are mandatory" });
}


     const UserToken = req.headers.authorization.split(" ")[1];
        if (!UserToken) {
            console.log("No token")
            return res.status(400).json({ message: "No token provided" });
        }
    

        // Verify JWT Token
        let User_Id ;

        const decoded = jwt.verify(UserToken, process.env.JWT_SECRET ,(error,result)=>{
            if(error){
                return res.status(400).json("token expired || token error")
            }
         User_Id = result.id;

        });

        if(!User_Id){
          console.log("error in UserId")
          return res.status(400).json({message:"Not found"})
        }

        const Update = `UPDATE users
SET 
    about = COALESCE($1, about),
    age = COALESCE($2,age),
    gender = COALESCE($3,gender),
    location = COALESCE($4,location)
   WHERE id = $5;
`
const data = await client.query(Update,[about,age,gender,location,User_Id]);


if(data.rowsCount===0){
  console.log("error in data1")
  return res.status(400).json({message:"error"})
}

const Update2 = ` UPDATE preferences 
SET interests = COALESCE($1,interests),
    hobbies = COALESCE ($2,hobbies),
    relationship_goal = COALESCE($3,relationship_goal)
    WHERE user_id = $4 ;
`
const data2 = await client.query(Update2,[interests,hobbies,relationShip,User_Id])

if(data2.rowsCount===0){
  console.log("error in data 2")
  return res.status(400).json({message:"Error try again"});
}

return res.status(200).json({message:"Updated successfully"});

          
  }catch(err){
    throw err;
  }
        }
  
//  send  user specific data only using userId

const SendUserData = async(req,res)=>{
  try{
      const userToken = req.headers.authorization.split(" ")[1];
      if(!userToken){
        console.log("no token");
        return res.status(400).json({message:"Invalid token"});}
       
      const verified = jwt.decode(userToken)
       const user_id= verified.id;  


      if(!user_id){
        console.log("No userId")
        return res.status(400).json({message:"No user id found"});
      }
   

      const  FindQuery = `SELECT users.id, users.name, users.email, 
       COALESCE(users.about, '') AS about, 
       COALESCE(users.age, 0) AS age, 
       COALESCE(users.gender, '') AS gender, 
       COALESCE(users.location, '') AS location, 
       COALESCE(users.images, ARRAY[]::text[]) AS images,
       COALESCE(preferences.interests, ARRAY[]::text[]) AS interests, 
       COALESCE(preferences.hobbies, ARRAY[]::text[]) AS hobbies, 
       COALESCE(preferences.relationship_goal, '') AS relationship_goal
FROM users
LEFT JOIN preferences ON preferences.user_id = users.id
WHERE users.id = $1;;
`;
      const User = await client.query(FindQuery,[user_id]);
      let backup;
      if(User.rows.length===0){
         backup = await client.query("SELECT name,age,about,location,gender,images FROM users WHERE id = $1",[user_id])

        return res.status(200).json(backup.rows);
      }

      return res.status(200).json(User.rows);
   

  }catch(error){
    throw error;
  }
}
exports.data = {verifyToken,ResetPassword,Login,Register,WelcomeMessage,upload,UploadMedia,SendUserData,UpdateProfile}