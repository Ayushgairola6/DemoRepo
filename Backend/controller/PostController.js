const {client} = require("../db.js");
const { uploadFile, deleteFile } = require('./FirebaseConfig/FirebaseConfig.js')


const CreatePost = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "No user found" });
        }
        // the data sent by the user
        const { title, caption, hashtag } = req.body;
        const media = req.file;
        if (!title || !caption || !hashtag ||!req.file) {
            console.log("All fields are mandatory!")
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const url = await uploadFile(media,"Posts/");
        const query = `INSERT INTO posts(user_id,title,caption,hashtag,mediaUrl) VALUES($1,$2,$3,$4,$5)`;
        const data = await client.query(query, [userId, title, caption, hashtag,url]);
        if (data.rowCount === 0) {
            return res.status(400).json({ message: "Error while creating a post for you!" });
        }
        return res.status(200).json({message:"Successfully created the post!"})
    } catch (error) {
        throw new Error(error);
    }
}

const SendPosts =async(req,res)=>{
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "No user found" });
        }

        const query =`SELECT u.name,p.title,p.caption,p.hashtag,p.mediaUrl FROM posts p LEFT JOIN users u ON u.id =p.user_id ORDER BY RANDOM() LIMIT 20`;

        const response = await client.query(query);

        // will return an empty array if no posts are created yet else will send 20 posts
        return res.status(200).json(response.rows);

    } catch (error) {
        throw new Error(error);
    }
}
exports.data = { CreatePost,SendPosts }
