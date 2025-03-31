import React,{useState} from 'react';
import {MdCancel} from 'react-icons/md'
import {motion} from 'framer-motion'
const ProfileCard  =({visible,setisVisible,user})=>{

	return (<>
{/*main container*/}
		<motion.div style={{background:"black",color:"black"}} initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="absolute h-full w-full overflow-auto bg-black/70 top-0 left-0 rounded-xl z-99 ">
	{/*the cancel icon*/}
		<MdCancel onClick={()=>{
			setisVisible(false )
		}}  className="fixed right-1 bg-white  rounded-full"color='black' size={33}/>

{/*the profile card*/}
		<div style={{background:"whitesmoke"}} className='m-auto bg-gray-300 w-full p-2 rounded-xl min-h-full'>
             
 {user[0].images[0] ? (
  user[0].images[0].split("?")[0].endsWith("mp4") || user[0].images[0].split("?")[0].endsWith("webm") ? (
    <video
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[0]}
      autoPlay
      loop
      controls={false}
    ></video>
  ) : (
    <img
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[0]}
      alt="Uploaded"
    />
  )
) : null}




          {/*name age gender and location*/}
          <div className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl font-bold">
	          	<span>{user[0].name}</span>{" "}
	          	<span>{user[0].age}</span>

          	<div>
          	 <span>{user[0].location}</span>          		
          	</div>

          </div>
       {/*second image of user*/}
           
  {user[0].images[1] ? (
  user[0].images[1].split("?")[0].endsWith("mp4") || user[0].images[1].split("?")[0].endsWith("webm") ? (
    <video
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[1]}
      autoPlay
      loop
      controls={false}
    ></video>
  ) : (
    <img
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[1]}
      alt="Uploaded"
    />
  )
) : null}




         <div className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
    <span className="text-lg font-bold">
      About
    </span>
   <p className="">{user[0].about?user[0].about:"Not specified"}</p>
  </div>
         {/*interests */} 
          <div className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
  <span className="text-lg font-bold">
      Interests
    </span>
    <div className="flex items-normal justify-normal gap-3 p-2 flex-wrap">
    {user[0].interests.map((int,index)=>{
      return (<ul className="border border-gray-400  px-2 rounded-full">{int}</ul>)
    })}
  </div>
  </div>

{/*third image*/}
 {user[0].images[2] ? (
  user[0].images[2].split("?")[0].endsWith("mp4") || user[0].images[2].split("?")[0].endsWith("webm") ? (
    <video
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[2]}
      autoPlay
      loop
      controls={false}
    ></video>
  ) : (
    <img
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[2]}
      alt="Uploaded"
    />
  )
) : null}




{/*fourth image*/}
           
 {user[0].images[3] ? (
  user[0].images[3].split("?")[0].endsWith("mp4") || user[0].images[3].split("?")[0].endsWith("webm") ? (
    <video
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[3]}
      autoPlay
      loop
      controls={false}
    ></video>
  ) : (
    <img
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[3]}
      alt="Uploaded"
    />
  )
) : null}




{/*hobbies*/}
<div  className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
  <span className="text-lg font-bold">
      Hobbies
    </span>
    <div className="flex items-normal justify-normal gap-3 p-2 flex-wrap">
    {user[0].hobbies.map((int,index)=>{
      return (<ul className="border border-gray-400  px-2 rounded-full">{int}</ul>)
    })}
  </div>
  </div>
            {user[0].images[4] ? (
  user[0].images[4].split("?")[0].endsWith("mp4") || user[0].images[4].split("?")[0].endsWith("webm") ? (
    <video
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[4]}
      autoPlay
      loop
      controls={false}
    ></video>
  ) : (
    <img
      className="h-90 w-full mt-4 object-cover rounded-md"
      src={user[0].images[4]}
      alt="Uploaded"
    />
  )
) : null}


      {/*profilecard end*/}
		</div>

	{/*end*/}
		</motion.div>

	</>)
}

export default ProfileCard;