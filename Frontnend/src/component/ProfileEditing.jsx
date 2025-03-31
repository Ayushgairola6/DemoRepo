import React, { useState,useRef,useEffect } from "react";
import "./ProfileEditing.css"; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { FaExclamation,FaPen,FaBasketballBall ,FaHeart } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import { PiGenderMaleBold } from "react-icons/pi"
import { FaLocationDot } from "react-icons/fa6";
function ProfileEditing() {
  const navigate = useNavigate()
const [status,setStatus] = useState("idle");
const Hobbies = ["Travel", "Reading", "Music", "Sports", "Cooking", "Photography", "Gaming", "Art", "Hiking", "Fishing",]
const Interests = ["Movies", "Politics", "Fiction", "Sci-Fi","Acting","Science"]

// some refs to capture the value
 const about = useRef();
 const age = useRef()
 const gender = useRef();
 const location = useRef();
 const [interests,setInterests] = useState([]);
 const [hobbies,setHobbies] = useState([]);
const relationShip = useRef();
 

useEffect(()=>{
 if(status==="finished"){
   navigate("/DashBoard")
 }
},[status])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      about:about.current.value,
      age:age.current.value,
      gender:gender.current.value,
      location:location.current.value,
      interests:interests,
      hobbies:hobbies,
      relationShip:relationShip.current.value
    }
    ;
    senData(data);
  };

  // sending data to the server

  const senData = async (data)=>{
          setStatus("loading")
    try{

      const response = await axios.post("/api/profile/update",data,{withCredentials:true},{
        headers:{
          'Content-Type':"application/json",
        }
      })
      setStatus("finished");

      setTimeout(()=>{
       setStatus("idle")
      },3000)
    }catch(err){
       setStatus("idle")
     throw err;
    }
  }

  

  // linear-gradient(135deg,lightgray,black)
  return (<>
     <h1 className="text-3xl text-center font-bold border-t  hover:underline">Update Profile</h1>    
    <form style={{background:"linear-gradient(190deg,lightskyblue,whitesmoke)"}} onSubmit={handleSubmit} className="h-full w-[95%] mx-auto  my-3 p-4 border border-gray-400 rounded-lg shadow-lg bg-gray-200 text-black p-2">
      <div style={{background:"ghostwhite",color:"black"}} className="mb-4 border border-gray-400 rounded-lg p-2">
        <label htmlFor="about" className="  font-bold text-2xl flex items-center justify-normal gap-3">About yourself <FaExclamation/></label>
        <span className="text-sm">Describe yourself (Hint:Write what describes you the best!)</span>

        <textarea ref={about}
          id="about"
          name="about"
         
          className="w-full p-2 border border-gray-400 rounded-xl"
        />
      </div>
      <div style={{background:"ghostwhite",color:"black"}} className="mb-4 p-2 border border-gray-400 rounded-lg p-2">
        <label htmlFor="age" className="  font-bold text-2xl flex items-center justify-normal gap-3">Age<GiAges/></label>
        <span className="text-sm">Be honest!</span>

        <input ref={age}
          type="number"
          id="age"
          name="age"
    
          className="w-full p-2 border border-gray-400 rounded-md"
        />
      </div>
      <div style={{background:"ghostwhite",color:"black"}} className="mb-4 border border-gray-400 rounded-lg p-2">
        <label htmlFor="gender" className="  font-bold text-2xl flex items-center justify-normal gap-3">Gender<PiGenderMaleBold/></label>
        <span className="text-sm">Don't hesitate and be yourself</span>
        
        <select
        ref={gender}
          id="gender"
          name="gender"
     
          className="w-full p-2 border border-gray-400 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div style={{background:"ghostwhite",color:"black"}} className="mb-4 border border-gray-400 rounded-lg p-2">
        <label htmlFor="location" className="  font-bold text-2xl flex items-center justify-normal gap-3">Location<FaLocationDot/></label>
        <span className="text-sm">Choose the right location! (This will help us in finding best people around you)</span>
        
        <input
        ref={location}
          type="text"
          id="location"
          name="location"
         
          className="w-full p-2 border border-gray-400 rounded-md"
        />
      </div>
      <div style={{background:"ghostwhite",color:"black"}} onClick={(e) => {
  const selectedInterest = e.target.textContent.trim();
  if (!interests.includes(selectedInterest)) {
    setInterests((prev) => [...prev, selectedInterest]);
  }
}} className="mb-4 cursor-pointer border border-gray-400 rounded-lg p-2">
        <label htmlFor="interests" className="  font-bold text-2xl  flex items-center justify-normal gap-3">Interests<FaBasketballBall/></label>
        <span className="text-sm">Choose what you think best resonates with you !(We match people based on this information)</span>
       
        <div  className='border border-gray-400 p-2 flex items-center justify-evenly flex-wrap gap-3 rounded-lg'>
          {Interests.map((int)=>{
          return <ul style={{
            border: interests.includes(int) ? '1px solid green' : '1px solid red',
            color: interests.includes(int) ? 'green' : 'red',
            borderRadius: '8px',
            padding: '0.5rem',
            fontWeight: 'bold'
          }}
           className={` rounded-lg  px-2 font-bold`} >{int}</ul>
        })
         
        }
</div>
      </div>
      <div style={{background:"ghostwhite",color:"black"}} onClick={(e) => {
  const selectedHobby = e.target.textContent.trim();
  if (!hobbies.includes(selectedHobby)) {
    setHobbies((prev) => [...prev, selectedHobby]);
  }
}} className="mb-4 cursor-pointer border border-gray-400 rounded-lg p-2">
        <label htmlFor="hobbies" className="  font-bold text-2xl flex items-center justify-normal gap-3">Hobbies<FaPen/></label>
        <span className="text-sm">Choose what you think best resonates with you !(We match people based on this information)</span>
       
        <div className='border border-gray-400 p-2 flex items-center justify-evenly flex-wrap gap-3 rounded-lg'>
        {Hobbies.map((h)=>{
          return <ul style={{
            border: hobbies.includes(h) ? '1px solid green' : '1px solid red',
            color: hobbies.includes(h) ? 'green' : 'red',
            borderRadius: '8px',
            padding: '0.5rem',
            fontWeight: 'bold'
          }}
            className={`rounded-lg  px-2 font-bold`} >{h}</ul>
        })
         
        }
         
        </div>

      </div>
      <div style={{background:"ghostwhite",color:"black"}} className="mb-4 rounded-lg p-2 border border-gray-400">
        <label htmlFor="relationship_goal" className=" font-bold text-2xl flex items-center justify-normal gap-3">Relationship Goal<FaHeart/></label>
        <span className="text-sm">What do u expect from a relationShip?</span>
       
        <input
        ref={relationShip}
          type="text"
          id="relationship_goal"
          name="relationship_goal"

          className="w-full p-2 border border-gray-400 rounded-md border border-gray-400"
        />
      </div>
      {status==="loading"?<div style={{borderTop:"4px solid red"}} className="w-12 h-12  rounded-full animate-spin m-auto"></div>:<button style={{background:"#24a0ed"}} type="submit" className="w-full p-2   rounded-md text-lg font-bold">Submit</button>}
    </form>


 </> );
};

export default ProfileEditing;
