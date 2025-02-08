const {client} = require("../db.js")



// THIS METHOD WILL SEND DATA TO THE CLIENT BASED ON THE Category HE HAS ASKED FOR  BY 
//  SEARCHING IN THE dating_resources TABLE FOR THE ARTICLES, LINKS ETC.. WITH THE Category IF MATCHES
const GetMaterial = async (req,res)=>{
 
 try{
   // filtered question sent via frontend
    const Category = req.body;

    if(!Category){
      console.log("No Category");
      return res.status(400).json({message:"This field cannnot be empty"});
    }
    // set a limit for pagination
      const limit = 10; // Items per page
      const offset = (page - 1)
    // find for resources in  the database based on the Category sent 
     const SearchQuery = `SELECT * FROM dating_resources WHERE Category = $1  LIMIT $2 OFFSET $3`;
     const result = await client.query(SearchQuery,[Category ]);

     // if no related data found with respect to the Category;
     if(result.rows.length===0){
       console.log("No results found");
      return res.status(400).json({mesage:"No results found",status:false});
     }
 
   // send the resources with true
    return res.status(200).json({data:result.rows,status:true});

 }
 catch(err){
 	console.log(err);
 	throw new Error("error")
 } 
}


// THIS METHOD WILL PROCESS PAYMENT WHEN SETTING UP VIRUAL COACH

const Set_Meeting = async (req,res)=>{
  try{
     const {coachName,CoachId ,date,time} = req.body;
     if(!coachName || date ||time){
      console.log("No coach or date or time  found");
      return res.status(400).json("All fields are mandatory");
     }
     
     // Search  for the coaches and if they have not any other meeting scheduled for the day and time;

     const searchCoach = `SELECT * FROM coach_table WHERE coach_name = $1 `;
     const result = await client.query(SearchQuery,[coachName]);
     const COACH = result.rows;

     if(result.rows.length ===0){
      console.log("NO coach found in the database");
      return res.status(400).json({mesage:"No such coach found"});
     }
   
      // checking if the coach already has meeting fixed for the given date and time;
      // Assuming Coach_Tablle contains array of dates and times which 
      //can we updated later when the coach takes the meeting
       const is_booked = COACH.Meetingdates.includes(date);
       const not_available = COACH.Meetingtimes.includes(time);

      // if coach is booked return status and date till coach is booked;
     if(is_booked || not_available ){
      console.log("Coach is already booked");
      return res.status(200).json({message:`Coach is already booked till date:${COACH.Meetingdates[COACH.Meetingdates.length-1]}`});
     }

          // Send coach data with a message
     return res.status(200).json({status:`${COACH} is available`});


  }catch(err){
    console.log(err);
    throw err;
  }
}

exports.data={GetMaterial ,Set_Meeting}