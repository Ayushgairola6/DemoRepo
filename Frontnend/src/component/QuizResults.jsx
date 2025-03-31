import React, { useState, useEffect } from "react";
import {UseStore} from '../store/store';
// import {FaHeart } from 'react-icons/fa'
import {FaHeart ,FaUser} from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
const Quizres = ()=>{
     const navigate = useNavigate();

	const {handleResponse,quizMatch,setQuizMatch,HandleLike} = UseStore()



const SendLikeData =(match)=>{
  HandleLike(match.id,match.images[0])
  const updated = quizMatch.filter((m)=>match !== m)
 setQuizMatch(updated)
  
 }




const Dislike =(match)=>{
 const updated = quizMatch.filter((m)=>match !== m)
 setQuizMatch(updated)
}



	return (<>

		<motion.div 
  style={{ background: "linear-gradient(140deg, lightpink, lavender)" }}
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.5 }} 
  onClick={() => console.log(quizMatch)} 
  className="min-h-screen flex items-center gap-2 flex-wrap justify-center p-4"
>
  {quizMatch.length !== 0 ? quizMatch.map((match, i) => {
    return (
      <div 
        style={{ background: "whitesmoke" }}
        className="profile-card relative p-2 border max-h-[35rem] overflow-auto w-full md:w-82 border-black rounded-xl hover:shadow-md hover:shadow-black cursor-pointer" 
        key={i}
      >
        {/* Profile Image 1 */}
        {match.images[0] ? (
          <div className="relative">
            {match.images[0].split("?")[0].endsWith("mp4") || match.images[0].split("?")[0].endsWith("webm") ? (
              <video
                className="h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[0]}
                autoPlay
                loop
                controls={false}
              />
            ) : (
              <img
                className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[0]}
                alt={`${match.name}'s profile`}
              />
            )}
          </div>
        ) : null}

        {/* Profile Name */}
        <h2 className="profile-name font-bold mt-2 flex items-normal justify-normal gap-2">
          <FaUser /> {match.name} {match.age}
        </h2>

        {/* Profile Location */}
        <div className="border border-gray-400 mt-2 p-3 rounded-xl">
          <label className="font-bold">Location:</label>
          <p className="profile-location">{match.city} {match.state} {match.country}</p>
        </div>

        {/* Image 2 */}
        {match.images[1] ? (
          <div className="relative">
            {match.images[1].split("?")[0].endsWith("mp4") || match.images[1].split("?")[0].endsWith("webm") ? (
              <video
                className="h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[1]}
                autoPlay
                loop
                controls={false}
              />
            ) : (
              <img
                className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[1]}
                alt="Uploaded"
              />
            )}
          </div>
        ) : null}

        {/* Hobbies Section */}
        <div className="border border-gray-400 mt-2 p-3 rounded-xl">
          <label className="font-bold">Hobbies:</label>
          <div className="flex items-center justify-evenly flex-wrap gap-2">
            {match.hobbies.map((hobby, i) => (
              <ul 
                style={{ 
                  color: "green",
                  border: "1px solid dimgray",
                  boxShadow: "2px 2px 2px lime" 
                }} 
                className="py-1 px-3 rounded-xl" 
                key={i}
              >
                {hobby}
              </ul>
            ))}
          </div>
        </div>

        {/* Image 3 */}
        {match.images[2] ? (
          <div className="relative">
            {match.images[2].split("?")[0].endsWith("mp4") || match.images[2].split("?")[0].endsWith("webm") ? (
              <video
                className="h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[2]}
                autoPlay
                loop
                controls={false}
              />
            ) : (
              <img
                className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[2]}
                alt="Uploaded"
              />
            )}
          </div>
        ) : null}

        {/* Interests Section */}
        <div className="border border-gray-400 mt-2 p-3 rounded-xl">
          <label className="font-bold">Interests:</label>
          <div className="flex items-center justify-evenly flex-wrap gap-2">
            {match.interests.map((int, i) => (
              <ul 
                style={{ 
                  color: "green",
                  border: "1px solid dimgray",
                  boxShadow: "2px 2px 2px lime" 
                }} 
                className="py-1 px-3 rounded-xl" 
                key={i}
              >
                {int}
              </ul>
            ))}
          </div>
        </div>

        {/* Image 4 */}
        {match.images[3] ? (
          <div className="relative">
            {match.images[3].split("?")[0].endsWith("mp4") || match.images[3].split("?")[0].endsWith("webm") ? (
              <video
                className="h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[3]}
                autoPlay
                loop
                controls={false}
              />
            ) : (
              <img
                className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[3]}
                alt="Uploaded"
              />
            )}
          </div>
        ) : null}

        {/* About Section */}
        <div className="profile-about border border-gray-400 mt-2 p-3 rounded-xl">
          <strong>About:</strong>
          <ul>{match.about}</ul>
        </div>

        {/* Image 5 */}
        {match.images[4] ? (
          <div className="relative">
            {match.images[4].split("?")[0].endsWith("mp4") || match.images[4].split("?")[0].endsWith("webm") ? (
              <video
                className="h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[4]}
                autoPlay
                loop
                controls={false}
              />
            ) : (
              <img
                className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                src={match.images[4]}
                alt="Uploaded"
              />
            )}
          </div>
        ) : null}

        {/* Buttons Container */}
        <div className="flex items-center justify-between px-10 mt-3">
          <div className="bg-black rounded-full p-2">
            <FaHeart 
              onClick={() => SendLikeData(match)} 
              size={32} 
              color="green" 
            />
          </div>
          <div className="bg-black rounded-full p-2">
            <MdCancel 
              onClick={() => Dislike(match)} 
              size={32} 
              color="red" 
            />
          </div>
        </div>
      </div>
    )
  }) : (
    <div className="h-screen text-4xl flex items-center justify-center flex-col gap-4 p-2 bg-white w-full">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuX8WkQSobOz0zq5xyYr8AMywbWO08bL3og&s" 
        alt="/404"
      />
      <button 
        onClick={() => navigate("/ProfileList")} 
        className="bg-green-400 py-1 px-4 rounded-xl font-bold text-lg shadow-md shadow-black"
      >
        See More
      </button>
    </div>
  )}
</motion.div>
	</>)
}

export default Quizres