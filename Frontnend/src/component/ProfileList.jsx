import { useState, useEffect, useRef ,useMemo} from "react";
import profiles from "../data.js";
import axios from 'axios';
import { FaHeart, FaUser } from 'react-icons/fa'
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { MdCancel } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion,AnimatePresence } from 'framer-motion'
import { FaDownload } from 'react-icons/fa6'

// import Popup from './Popup.jsx'
import Matched from './MatchComp'
import { recommendationContext, UseStore } from '../store/store';

import "./ProfileList.css";

const ProfileList = () => {

  const heartRef = useRef()
  const crossRef = useRef()
  const navigate = useNavigate();

  // const {isLoggedIn,matchFound,setMatchFound} = UseStore();

  const { GetProfiles, matches, setMatches, HandleLike, isLoggedIn, matchFound, setMatchFound } = UseStore()

  //fetch profiles from the database
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/error")
    }
    else {
      GetProfiles()
    }
  }, [isLoggedIn])



  //function to manage media downloads
  const DownloadMedia = async (image) => {
    if (!image) {
      return;
    }
    const link = document.createElement("a");
    link.href = image;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  // Send Like data

  const SendLikeData = (match) => {
    
    const updated =  matches.filter((e)=>e.id!==match.id)
    setMatches(updated);
      HandleLike(match.id, match.images[0]);
    
  };




  const Dislike = (match) => {
    const updated =  matches.filter((e)=>e.id!==match.id)
    setMatches(updated);
  };


  // fetch more ProfileList

  const getMore = () => {
    GetProfiles();
  }

  return (
    <motion.div style={{ background: "linear-gradient(140deg, lightpink, lavender)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=" profile-container  relative min-h-screen">
      {matchFound === "Matched" ? (<><Matched />
        <Confetti style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }} /></>) : null}
      {/* if the matches are sent from the database render them*/}
      {matches !== null && matches.length > 0 ? (
        matches.map((match, index) => (
          <motion.div   style={{ background: "whitesmoke" }}
            className="relative p-2 border max-h-screen md:max-h-[35rem] overflow-auto w-full md:w-82  border-black rounded-xl hover:shadow-md hover:shadow-red-500 cursor-pointer"
            key={index}
          >
            {/* Profile Image */}
            {match.images[0] ? (
              <div className="relative">
                {match.images[0].split("?")[0].endsWith("mp4") || match.images[0].split("?")[0].endsWith("webm") ? (
                  <video
                    className="h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[0]}
                    autoPlay
                    loop
                    controls={false}
                  ></video>
                ) : (
                  <img
                    className="md:h-50 h-90 w-full mt-4 object-cover rounded-md relative"
                    src={match.images[0]}
                    alt="Uploaded"
                  />
                )}
                <FaDownload onClick={() => DownloadMedia(match.images[0])} size={25} className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1" />
              </div>
            ) : null}

            {/* Profile Name */}
            <h2 className="profile-name font-bold mt-2 flex items-normal justify-normal gap-2"><FaUser />{match.name} {match.age}</h2>

            {/* Profile Location */}
            <div className="border border-gray-400 mt-2 p-3 rounded-xl">
              <label className="font-bold ">Location:</label>
              <p className="profile-location">{match.city} {match.state} {match.country}</p>
            </div>

            {/*2nd media file of the user*/}
            {match.images[1] ? (
              <div className="relative">
                {match.images[1].split("?")[0].endsWith("mp4") || match.images[1].split("?")[0].endsWith("webm") ? (
                  <video
                    className="h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[1]}
                    autoPlay
                    loop
                    controls={false}
                  ></video>
                ) : (
                  <img
                    className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[1]}
                    alt="Uploaded"
                  />
                )}
                <FaDownload onClick={() => DownloadMedia(match.images[1])} size={32} className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1" />
              </div>
            ) : null}
            {/* Hobbies Section */}
            <div className="border border-gray-400 mt-2 p-3 rounded-xl ">

              <label className="font-bold">Hobbies:</label>
              <div className="flex items-center justify-evenly flex-wrap gap-2">
                {match.hobbies.map((hobby, i) => (
                  <ul style={{ color: "green", border: "1px solid dimgray", boxShadow: "2px 2px 2px lime" }} className="py-1 px-3 rounded-xl" key={i}>{hobby}</ul>
                ))}
              </div>
            </div>

            {match.images[2] ? (
              <div className="relative">
                {match.images[2].split("?")[0].endsWith("mp4") || match.images[2].split("?")[0].endsWith("webm") ? (
                  <video
                    className="h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[2]}
                    autoPlay
                    loop
                    controls={false}
                  ></video>
                ) : (
                  <img
                    className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[2]}
                    alt="Uploaded"
                  />
                )}
                <FaDownload onClick={() => DownloadMedia(match.images[2])} size={32} className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1" />
              </div>
            ) : null}
            {/* Interests Section */}
            <div className="border border-gray-400 mt-2 p-3 rounded-xl gap-2">
              <label className="font-bold">Interests:</label>
              <div className="flex items-center justify-evenly flex-wrap ">
                {match.interests.map((int, i) => (
                  <ul style={{ color: "green", border: "1px solid dimgray", boxShadow: "2px 2px 2px lime" }} className="py-1 px-3 rounded-xl" key={i}>{int}</ul>
                ))}
              </div>
            </div>
            {match.images[3] ? (
              <div className="relative">
                {match.images[3].split("?")[0].endsWith("mp4") || match.images[3].split("?")[0].endsWith("webm") ? (
                  <video
                    className="h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[3]}
                    autoPlay
                    loop
                    controls={false}
                  ></video>
                ) : (
                  <img
                    className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[3]}
                    alt="Uploaded"
                  />
                )}
                <FaDownload onClick={() => DownloadMedia(match.images[3])} size={32} className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1" />
              </div>
            ) : null}
            {/* About Section */}
            <div className="profile-about border border-gray-400 mt-2 p-3 rounded-xl">
              <strong>About:</strong>
              <ul>{match.about}</ul>
            </div>
            {match.images[4] ? (
              <div className="relative">
                {match.images[4].split("?")[0].endsWith("mp4") || match.images[4].split("?")[0].endsWith("webm") ? (
                  <video
                    className="h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[4]}
                    autoPlay
                    loop
                    controls={false}
                  ></video>
                ) : (
                  <img
                    className="md:h-50 h-90 w-full mt-4 object-cover rounded-md"
                    src={match.images[4]}
                    alt="Uploaded"
                  />
                )}
                <FaDownload onClick={() => DownloadMedia(match.images[4])} size={32} className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1" />
              </div>
            ) : null}
            {/* Buttons */}
            <div className="flex items-center justify-between px-10 mt-3">
              <div  id="like" className="bg-black rounded-full p-2 "><FaHeart  ref={heartRef} onClick={() => SendLikeData(match)} size={32} color="lime" /></div>
              <div  id="dislike" className="bg-black rounded-full p-2 "><MdCancel ref={crossRef} onClick={() => Dislike(match)} size={32} color="magenta" /></div>
            </div>
          </motion.div>
          
        ))
      ) : matches !== null && matches.length === 0 ? (
        <div className="h-screen  text-4xl text-center w-full flex justify-center items-center">That is all</div>
      ) : (
        <div className="h-screen">
          <div className="bg-white/60 w-56 h-56 p-2 flex items-center justify-evenly flex-col rounded-xl animate-pulse">
            {/* Profile Image */}
            <img src="/" alt="" />

            {/* Loading Placeholder */}
            <h2 className="bg-black/30 w-full h-5 rounded-xl text-center"></h2>
            <p className="bg-black/30 w-full h-5 rounded-xl text-center"></p>
            <div className="bg-black/30 w-full h-5 rounded-xl text-center">
              <strong></strong>
              <ul></ul>
            </div>
            <div className="bg-black/30 w-full  p-2 text-center font-bold text-black rounded-xl">
              <strong></strong>
              <ul></ul>
            </div>
          </div>
        </div>

      )}

      <span onClick={() => {
        getMore()
      }} className=" mt-2 w-full flex items-end justify-end flex-col font-bold cursor-pointer  hover:animate-pulse"><FaSquareArrowUpRight size={32} />
        See More
      </span>
    </motion.div>
  );
};

export default ProfileList;
