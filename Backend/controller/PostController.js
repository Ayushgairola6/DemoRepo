const { client } = require("../db.js");
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
        if (!title || !caption || !hashtag || !req.file) {
            console.log("All fields are mandatory!")
            return res.status(400).json({ message: "All fields are mandatory!" });
        }

        const url = await uploadFile(media, "Posts/");
        const query = `INSERT INTO posts(user_id,title,caption,hashtag,mediaUrl) VALUES($1,$2,$3,$4,$5)`;
        const data = await client.query(query, [userId, title, caption, hashtag, url]);
        if (data.rowCount === 0) {
            return res.status(400).json({ message: "Error while creating a post for you!" });
        }
        return res.status(200).json({ message: "Successfully created the post!" })
    } catch (error) {
        throw new Error(error);
    }
}

const SendPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "No user found" });
        }

        const query = `SELECT 
    u.name, 
    u.images, 
    p.title, 
    p.caption, 
    p.hashtag,
    p.id,
    p.created_at, 
    p.mediaUrl, 
    COUNT(pl.user_id) AS like_count, -- Count the likes per post
    ARRAY_AGG(
        jsonb_build_object(
            'comment_id', c.id, 
            'user_id', c.user_id, 
            'content', c.content, 
            'created_at', c.created_at
        )
    ) AS comments -- Aggregate comments as an array of JSON objects
FROM 
    posts p
LEFT JOIN 
    users u ON u.id = p.user_id
LEFT JOIN 
    postlikes pl ON pl.post_id = p.id
LEFT JOIN 
    comments c ON c.post_id = p.id -- Fetch comments for each post
GROUP BY 
    u.name, u.images, p.title, p.caption, p.hashtag, p.created_at, p.mediaUrl,p.id
ORDER BY 
    RANDOM()
LIMIT 20;`


        const response = await client.query(query);

        // will return an empty array if no posts are created yet else will send 20 posts
        return res.status(200).json(response.rows);

    } catch (error) {
        throw new Error(error);
    }
}


const AddComment = async (req, res) => {
    try {
        const { comment, post_id } = req.body;
        if (!comment) return res.status(400).json({ message: "All fields are necessary!" });
        const userId = req.user.id
        if (!userId) {
            return res.status(400).json({ message: "Unauthoirzed" });
        }
        const query = `INSERT INTO comments (post_id,user_id,content) VALUES ($1,$2,$3) ;`
        const data = await client.query(query, [post_id, userId, comment]);
        if (data.rowCount === 0) {
            return res.status(400).json({ message: "Error while adding a comment" });
        }
        return res.status(200).json({ message: "Comment Added" });
    } catch (error) {
        throw new Error(error);
    }
}


const LikePost = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "Unauthoirzed" });
        }
        const post_id = req.params.id;

        // check if post has alrady been liked
         const check = `SELECT * FROM postlikes WHERE post_id = $1 AND user_id = $2`;
         const response = await client.query(check,[post_id,userId]);
        //  if post has been already liked remove it
         if(response.rows.length>0){
            const query = `DELETE FROM postlikes WHERE post_id = $1 AND user_id = $2`;
            const data = await client.query(query,[post_id,userId]);
            if(data.rowCount===0){
                return res.status(400).json({ message: "Error while unliking the post" });
            }
            return res.status(200).json({ message: "Unliked successfully" });
         }

        const query = `INSERT INTO postlikes (user_id,post_id) VALUES ($1,$2)`;
        const data = await client.query(query, [userId, post_id]);

        if (data.rowCount === 0) {
            return res.status(400).json({ message: "Error could not like the post" });
        }
        return res.status(200).json({ message: "Liked successfully" });
    } catch (error) {
        throw new Error(error);
    }
}
exports.data = { CreatePost, SendPosts ,AddComment,LikePost}
