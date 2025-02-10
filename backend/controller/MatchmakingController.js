//AUTO MATED MATCHMAKING  
const {client} = require("../db.js");
 //  gather users in a single cluster to avoid slow response
const jwt_Secret = process.env.JWT_SECRET;


 const createcluster = async ()=>{
 	try{
 	  const token = req.headers.authorization.split(" ")[1];

    // location can be fetched using geo ip npm package 
    const UserLocation = "current location"
    if(!token){
     console.log("no token found")
    return res.status(400).json("No token found")
    }
     const decoded = jwt.verify(token,jwt_Secret);

     const user = decoded.id

     if(!user){
      console.log("No user found");
      return res.status(400).json({message:"No user found"})
     }

     // defining cluster
      const userClusters = {};
     // get all users fromt the databse
      const SearchQuery = `SELECT * FROM users`;
      const res = await client.query(SearchQuery);
      const AllUsers = res.rows;
      // make cluster by filtering based on age and location
      AllUsers.forEach((user,index)=>{
      	const clusterKey = `${user.location}-${Math.floor(user.age/10)*10}`;
          
          if(!userClusters[clusterKey]){
          	userClusters[clusterKey] = [];
          }

         userClusters[clusterKey].push(user);
      })
 
      // call the function that matches profiles
      findMatches(user,userClusters)

 	}catch(error){
      console.log("error in cluster making function");
      throw new Error("Error while creating clusters");
 	}
 } 



// find matches for  the users
	const findMatches = (user,allUser)=>{
     
       // create a clusterKey based on user preference
		const clusterKey = `${user.preference.location}-${Math.floor(user.preference.age/10)*10}`
       
       // add profiles that either matches the preference or empty array
       const cluster = allUser[clusterKey] || [];
       // loop over the cluster of matched profiles to get individual profile
       
       const matches = cluster.forEach((profile)=>{
        if(user.id===profile.id){
        	return false;
        	return (profile.age >= user.preference.age[0] && profile.age <= user.preference.age[1]);
        }; 
       });

      // profilematching score based on user preference age and location;
       const scoredMatch = matches.map((otherUser)=>{
       	user:otherUser,
       	score:calculateCompatibility(user,otherUser);
       })


       // if we dont recieve and empty array we'll sort the data from the array
       if(scoredMatch.length >0){
       	return scoredMatch.sort((a,b)=>{
       		b.score - a.score
       	})
       }
         // else send some random profiles fromt the cluster

         
       else{
       	return getRandomUserFromCluster(cluster,5);
       }

	}

   // function to calculate comapatibility between userClusters which is called when users are
   const calculateCompatibility =(useer1,user2)=>{
    // filter the common interests from user1 and user2 profiles
     const commonInterest = user1.interests.filter((interest)=> user2.interests.includes(interest));
     return commonInterest.length * 10;
   }







  //  fallback function which will be only called when there are no any matches for the users

  const getRandomUserFromCluster = (cluster, count) => {
    // Check if the cluster has users
    if (!cluster || cluster.length === 0) {
        console.log("Cluster is empty");
        return []; // Return an empty array if there are no users
    }

    // Shuffle the cluster to ensure randomness
    const shuffledCluster = cluster.sort(() => 0.5 - Math.random());

    // Slice the shuffled array to get the desired number of users
    return shuffledCluster.slice(0, Math.min(count, cluster.length));
};