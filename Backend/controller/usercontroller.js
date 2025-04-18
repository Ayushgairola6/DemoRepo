// const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const openpgp = require('openpgp');
const dotenv = require('dotenv');
const fs = require('fs');
const cookieParser = require("cookie-parser");
const { client } = require("../db.js")
const { uploadFile, deleteFile } = require('./FirebaseConfig/FirebaseConfig.js')

// multer for handling image parsing
const multer = require("multer");

//  only upto 20 mb are allowed 
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
const Register = async (req, res) => {

  try {

    const { name, email, password } = req.body;
    const image = req.file



    if (!name || !email || !password || !image) {
      return res.status(400).json({ message: "All fields are required" })
    }


    // check if the user already exists

    const Check = `SELECT * FROM users WHERE email = $1`;
    const USER = await client.query(Check, [email]);

    if (USER.rows.length > 0) {
      console.log("user already exists")
      return res.status(400).json({ message: "User already exists" });
    }

    let ImageUrl = [];
    if (image) {
      Image = await uploadFile(image, "images/");
      ImageUrl = [Image];
    }
    // ImageUrlArray= [thereisnoimageforthisuser];
    // Hash the user's password before storing it

    if (!ImageUrl || ImageUrl.length === 0) {
      return res.status(400).json({ message: "Please try again later" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);


    // Insert user details into the database
    const InsertQuery = `INSERT INTO users (name, email, hashed_password,images) 
       VALUES ($1, $2, $3, $4) RETURNING id `
    const result = await client.query(InsertQuery,
      [name, email, hashedPassword, ImageUrl]
    );



    if (result.rows.length === 0) {
      return res.status(400).json({ message: "error while creating and account , please try again" })
    }

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user.' });
  }
};




// User Login
const Login = async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are necessary" })
    }
    // Check if the user exists in the database
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });

    // verifying the password 
    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password.' });
    // Create a JWT token for the newly logged in user
    const token = jwt.sign({ id: result.rows[0].id, name: result.rows[0].name, email }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Login successful!', token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in.' });
  }
};

// Forgot Password
const ResetPassword = async (req, res) => {
  // email and password are necessary are neccessary so that we can store it in the db
  try {
    const { email, newpassword } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are mandatory");
    }

    // Check if the user exists
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found.' });


    // if the user exists update his password in the database

    const UpdatedPassword = bcrypt.hash(newpassword, 10);


    // update the user in the database

    const Update = await client.query("UPDATE users SET password = $1 WHERE email = $2", [UpdatedPassword, email])

    if (Update.rows.length === 0) {
      return res.status(400).json({ message: "error while updating your password" })
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

//  send  user specific data only using userId

const SendUserData = async (req, res) => {
  try {
    const user_id = req.user.id;

    if (!user_id) {
      console.log("No userId")
      return res.status(400).json({ message: "No user id found" });
    }


    const FindQuery = `SELECT users.id, users.name, users.email, 
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
WHERE users.id = $1;
`;
    client.query(FindQuery, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" })
      }
      return res.status(200).json(result.rows);
    });



  } catch (error) {
    throw error;
  }
}


// update profile related data;
const UpdateProfile = async (req, res) => {
  try {
    const { about, age, location, interests, hobbies, relationShip, gender } = req.body;
    // Validate required fields
    if (!about || !age || !location || !interests || !hobbies || !relationShip || !gender) {
      console.log("All fields are mandatory");
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Extract token from headers
    const User_Id = req.user.id;
    if (!User_Id) {
      console.log("Error in UserId");
      return res.status(400).json({ message: "User ID not found" });
    }

    // Update users table
    const UpdateUserQuery = `
      UPDATE users
      SET 
        about = COALESCE($1, about),
        age = COALESCE($2, age),
        gender = COALESCE($3, gender),
        location = COALESCE($4, location)
      WHERE id = $5;
    `;
    const userUpdateResult = await client.query(UpdateUserQuery, [about, age, gender, location, User_Id]);

    if (userUpdateResult.rowCount === 0) {
      console.log("Error updating users table");
      return res.status(400).json({ message: "Error updating user profile" });
    }
    const safeInterests = `{${interests.map((i) => `"${i}"`).join(",")}}`;
    const safeHobbies = `{${hobbies.map((h) => `"${h}"`).join(",")}}`;
    // Update preferences table (use INSERT ... ON CONFLICT to handle missing rows)
    const UpdatePreferencesQuery = `
      INSERT INTO preferences (user_id, interests, hobbies, relationship_goal)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        interests = EXCLUDED.interests,
        hobbies = EXCLUDED.hobbies,
        relationship_goal = EXCLUDED.relationship_goal;
    `;
    client.query(UpdatePreferencesQuery, [User_Id, safeInterests, safeHobbies, relationShip], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" })
      }
      if (result.rowCount > 0) {
        return res.status(200).json({ message: "Profile updated successfully" });
      }
    });



  } catch (err) {
    console.error("Error in UpdateProfile:", err);
  }
};




//function to upload media files like 5 images and videos


const UploadMedia = async (req, res) => {
  try {


    if (!req.files || req.files.length < 1) {
      return res.status(400).json({ message: "Please choose atleast one image" });
    }

    const Images = req.files;
    let ImageUrl = [];
    // if there are images only then upload em to the database
    if (Images && Images.length > 0) {
      ImageUrl = await Promise.all(
        Images.map(file => uploadFile(file, "images/"))
      );
    }

    const User_Id = req.user.id;



    if (!User_Id) return res.status(400).json({ message: "User not found" });

    const query = `UPDATE users 
SET images = COALESCE(images, '{}') || $1 
WHERE id = $2
RETURNING images
`
    const data = await client.query(query, [ImageUrl, User_Id]);

    if (data.rowCount === 0) {
      return res.status(400).json({ message: "Error while inserting images" });
    }

    UserDataQuery = `SELECT users.id, users.name, users.email, 
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

    const userProfile = await client.query(UserDataQuery, [User_Id]);
    if (userProfile.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(userProfile.rows)


  } catch (error) {
    throw error;
  }
}

//  send all like request to the user
const SendSelectedUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    if (!user_id) {
      return res.status(400).json({ message: "User not found!" });
    }

    const query = `SELECT u.name, u.images, l.user_id
FROM likes l
LEFT JOIN users u ON l.user_id = u.id
WHERE l.liked_user_id = $1
AND NOT EXISTS (
  SELECT 1
  FROM matches m
  WHERE 
    (m.user1_id = l.user_id AND m.user2_id = l.liked_user_id)
    OR 
    (m.user1_id = l.liked_user_id AND m.user2_id = l.user_id)
)
`;
    const acc = await client.query(query, [user_id]);

    return res.status(200).json(acc.rows);

  } catch (error) {
    throw new Error(error);
  }
}


// handle like requests

const AcceptMatchRequest = async (req, res) => {
  try {
    const user_id = req.user.id;
    const UserwhoRequested = req.params.requested_user;

    if (!user_id || !UserwhoRequested) {
      return res.status(400).json({ message: 'Error user not found' });
    }

    // Check if reverse like already exists
    const reverseLikeQuery = `
      SELECT 1 FROM likes 
      WHERE user_id = $1 AND liked_user_id = $2
    `;
    const reverseLike = await client.query(reverseLikeQuery, [UserwhoRequested, user_id]);

    // Insert current user's like
    const insertQuery = `
      INSERT INTO likes (user_id, liked_user_id) 
      VALUES ($1, $2) 
      ON CONFLICT DO NOTHING;
    `;
    const likeInsert = await client.query(insertQuery, [user_id, UserwhoRequested]);

    if (likeInsert.rowCount === 0) {
      return res.status(400).json({ message: "You already accepted this request" });
    }

    if (reverseLike.rowCount > 0) {
      // It's a match!
      const insertMatchQuery = `
        INSERT INTO matches (user1_id, user2_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
      `;
      await client.query(insertMatchQuery, [user_id, UserwhoRequested]);
      return res.status(200).json({ message: "It's a match!" });
    }

    return res.status(200).json({ message: "Invitation accepted" });

  } catch (error) {
    console.error("Match accept error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const RejectRequests = async (req, res) => {
  try {

    const user_id = req.user.id;
    const RejectedUser = req.params.rejecteduser;

    if (!user_id || !RejectedUser) {
      return res.status(400).json({ message: "Error user not found!" });
    }

    const query = `DELETE FROM likes 
WHERE 
  (user_id = $1 AND liked_user_id = $2) 
  OR 
  (user_id = $2 AND liked_user_id = $1);`

    const data = await client.query(query, [user_id, RejectedUser]);

    return res.status(200).json({ message: "Rejected request successfully!" })

  } catch (error) {
    throw new Error(error);
  }
}
// delete images
const DeleteImage = async (req, res) => {
  try {


    const imageUrl = req.body.url;

    if (!imageUrl) {
      return res.status(400).json({ message: "No image url found" })
    };


    const User_Id = req.user.id;

    if (!User_Id) { return res.status(400).json({ message: "User not found" }) };

    const query = `SELECT images from users WHERE id = $1`;
    const data = await client.query(query, [User_Id]);

    if (data.rows.length === 0) { return res.status(400).json({ message: "User not found" }) };

    const images = data.rows[0].images;


    const IsValid = images.includes(imageUrl);


    if (!IsValid) {
      console.log("not a valid url or you are not authorized to delete this image")
      return res.status(400).json({ message: "Image cannot be deleted" });
    }


    const deleteQuery = `UPDATE users 
SET images = array_remove(images, $1) 
WHERE id = $2
RETURNING *`

    const response = await client.query(deleteQuery, [imageUrl, User_Id]);

    // deleting the image from the userdata 
    if (response.rowCount === 0) {
      return res.status(400).json({ message: "Error while deleting the image" });
    }

    // deleting the image from firebase firestore
    const Order = await deleteFile(imageUrl);

    if (!Order) {
      return res.status(400).json({ message: "Error while deleting image" });

    }
    // sending the update data of the user
    const UserDataQuery = `SELECT users.id, users.name, users.email, 
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

    const userProfile = await client.query(UserDataQuery, [User_Id]);
    if (userProfile.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(userProfile.rows)

  } catch (error) {
    throw error;
  }
}

// download media files

const DownloadMedia = async (req, res) => {
  try {

    const imageUrl = req.body.url
    if (!imageUrl) {
      return res.status(400).json({ message: "This request cannot be processed" })
    }




  } catch (error) {
    throw new Error(error)
  }
}

const SendSpecifiProfile = async (req, res) => {
  try {

    const userTobeFetched = req.params.RequestedUser;
    if (!userTobeFetched) return res.status(400).json({ message: "User not found!" });

    const query = `SELECT users.id, users.name, users.email, 
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
WHERE users.id = $1; `

    const data = await client.query(query, [userTobeFetched]);


    if (!data.rows.length === 0) {
      return res.status(400).json({ message: "User data could not be found! Please try again later!" });
    }
    console.log(data.rows);    return res.status(200).json(data.rows);
  } catch (error) {
    throw new Error(error);
  }
}


exports.data = { ResetPassword, Login, Register, WelcomeMessage, upload, UploadMedia, SendUserData, UpdateProfile, DeleteImage, DownloadMedia, SendSelectedUser, AcceptMatchRequest, RejectRequests ,SendSpecifiProfile}


