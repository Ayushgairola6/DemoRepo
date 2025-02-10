import {useState,useEffect} from "react";
import profiles from "../data.js";
import axios from 'axios';
import {FaHeart} from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'
import {useNavigate} from 'react-router-dom';
import Popup from './Popup.jsx'
import {recommendationContext,UseStore} from '../store/store';

import "./ProfileList.css";

const ProfileList = () => {
  const navigate = useNavigate();
  
  const {isLoggedIn} = UseStore();

  const {GetProfiles,matches,setMatches,HandleLike} = UseStore()

  //fetch profiles from the database
  useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])

  useEffect(()=>{
   if(isLoggedIn===true){GetProfiles()}
  },[])

 

 // Send Like data

 const SendLikeData =(match)=>{
  console.log(match)
  HandleLike(match.id)
  const updated = matches.filter((m)=>match !== m)
 setMatches(updated)
  
 }


const Dislike =(match)=>{
 const updated = matches.filter((m)=>match !== m)
 setMatches(updated)
}

  return (
    <div  className="profile-container ">

  {/* if the matches are sent from the database render them*/}
      {matches!==null? matches.map((match, index) => (
        <div className="profile-card rounded-xl hover:shadow-md hover:shadow-black  cursor-pointer" key={index}>
          {/* Profile Image */}
          <img 
            src={match.image} 
            alt={`${match.name}'s profile`} 
            className="profile-image" 
          />
          
          {/* Profile Name */}
          <h2 className="profile-name">{match.name}</h2>
          
          {/* Profile Location */}
          <p className="profile-location">{match.location}</p>
          
          {/* Hobbies Section */}
          <div className="profile-hobbies">
            <strong>interests:</strong>
            <ul>
              {match.interests.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
          
          {/* About Section */}
          <div className="profile-about">
            <strong>About:</strong>
            <ul>
              {match.about}
            </ul>
          </div>
        {/* buttons container*/}
          <div className="flex items-center justify-evenly mt-3">
            <button onClick={()=>SendLikeData(match)}  className="bg-black/80 p-2 rounded-full hover:scale-110">
              <FaHeart size={32} color="green"/>
            </button>
            <button onClick={()=>Dislike(match)} className="bg-black/80 p-2 rounded-full hover:scale-110">
              <MdCancel size={32} color="red"/><
            /button>
          </div>
        </div>
      )):
// else render this loading card
      <div onClick={()=>console.log(matches)} className="h-screen ">
        
 <div className="bg-white/60 w-56 h-56 p-2 flex items-center justify-evenly flex-col  rounded-xl animate-pulse" >
          {/* Profile Image */}
          <img 
            src="/"
            alt="" 
             
          />
          
          {/* Profile Name */}
          <h2 className="bg-white/30  w-full rounded-xl text-center">...</h2>
          
          {/* Profile Location */}
          <p className="bg-white/30 w-full rounded-xl text-center">...</p>
          
          {/* Hobbies Section */}
          <div className="bg-white/30  w-full rounded-xl text-center">
            <strong></strong>
            <ul>
             ...
            </ul>
          </div>
          
          {/* About Section */}
          <div className="bg-white/30 w-full p-2 text-center font-bold text-black rounded-xl">
            <strong>
       </strong>
            <ul>
            Please wait!
            </ul>
          </div>
        </div>



      </div>}
    </div>
  );
};

export default ProfileList;
