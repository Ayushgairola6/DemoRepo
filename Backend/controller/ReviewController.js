const { client } = require("../db.js");

const RecieveReviews = async(req, res) => {
    try {
        const userID = req.user.id;
        if (!userID) { return res.status(400).json({ message: "User Id not found" }); }

        const { review ,rating} = req.body;
        // console.log(review);
        if (!review || !rating) { return res.status(401).json({ message: "All fields are mandatory" }); }
      
        const query =`INSERT INTO reviews (user_id,text,rating) VALUES ($1,$2,$3)`
       const data  = await client.query(query, [userID, review,rating]);

        if(data.rowCount===0){
            return res.status(400).json({message:"Error while capturing your response!"})
        }
            return res.status(200).json({message:"Response captured successfully."})


    } catch (error) {
        console.log(error);
    }
}

 function SendReviews (req,res){
 try {
    client.query( `SELECT r.rating,r.text,r.id,u.name,u.images,r.day FROM reviews r JOIN users u ON u.id = r.user_id LIMIT 6`,(err,result)=>{
        if(err){
            return res.status(500).json({message:"Internal server error"});
        }
            return res.status(200).json(result.rows);            
        
    });
    
 } catch (error) {
    console.log(error);
 }
}
exports.data = { RecieveReviews,SendReviews }