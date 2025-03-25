const jwt = require("jsonwebtoken");
const jwt_key = 12345;
const {client} = require("../db.js")




// insertin the reviews
const Reviews = async (req,res)=>{
  try{
  	// text body and token sent from frontend
      const {text} = req.body;
      const token = req.headers.authorization.split(" ")[1];
      let user_id ; 
      if(!token || text){
      	return res.status(400).json({message:"No headers token found or text found!"})
      }

      // extracting the token
       const verified = jwt.verify(token,jwt_key,(error,result)=>{
       	if(error){
       		return res.status(400).json(error);
       	}
       	user_id = result.id;
       })

       const Insert_query = ` INSERT INTO reviews (text) VALUES ( @1 )`;
       const data = await client.query(Insert_query,[user_id]);

     if(data.length ===0){
     	return res.status(400).json("error while updating data in the database");
     }
     return res.status(200).json(data);

  }catch(error){
  	throw new Error("error",error);
  }
}