import React,{useState,useRef,useEffect} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import {FaUser} from 'react-icons/fa'
import "./ProfileOverview.css"; // Import the profile overview specific styles
import profilePic from "../assets/Boy.png"; // Add your profile image here
import ProfileCard from './ProfileCard'
import {UseStore} from '../store/store';
import {MdCancel} from 'react-icons/md'
import {FaTrashAlt} from 'react-icons/fa'
import {FaDownload} from 'react-icons/fa6'
import axios from 'axios';


const ProfileOverview = () => {

  const [visible,setisVisible] = useState(false);
  const firstImg = useRef()
  const secondImg = useRef()
  const thirdImg = useRef()
  const fourthImg = useRef()
  const fifthImg = useRef()
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "webm", "ogg"];

const [firstImage,setfirstImage] = useState(null)
const [secondImage,setsecondImage] = useState(null)
const [thirdImage,setthirdImage] = useState(null)
const [fourthImage,setfourthImage] = useState(null)
const [fifthImage,setfifthImage] = useState(null)


  const navigate = useNavigate(); // Initialize navigate function
     const {user,setUser,UploadMedia,uploadStatus} = UseStore()

  const handleEditProfile = () => {
    navigate("/profile-editing"); // Navigate to Profile Editing page
  };
  
  // upload media function

  const UploadFiles = () => {
 
   const Form = new FormData();

    const refs = [firstImg,secondImg,thirdImg,fourthImg,fifthImg];
// appending all the images to the form with same key value;
   
   refs.forEach((ref)=>{
    if(ref.current && ref.current.files[0]){
     Form.append("files",ref.current.files[0]);
    }
  })


   // if the form do not have atleast one image return 
  if(!Form.has("files")){
    alert("Please choose at least one image")
    return ;
  }

UploadMedia(Form)

};

// function to delete a specific image
async function DeletImage(image){
 

  try{
   

    if(!image){
      return ;
    }
    const data = {url:image};
    if(!data){
      return ;
    }
    // https://luvlensebackend.onrender.com
    const response = await axios.post("https://luvlensebackend.onrender.com/media/delete",data,{withCredentials:true},{
      headers:{
        "Content-Type":"application/json"
      }
    })
    setUser(response.data)
  }catch(error){
    throw error;
  }
}


// function to download media files for individual users

const DownloadMedia = async(image,e)=>{
 if(!image ){
  return ;
 }
 const link = document.createElement("a");
 link.href = image;
 link.download = "";
  document.body.appendChild(link);
    link.click();
 document.body.removeChild(link);
  
}

const getMediaType = (url) => {
  const extension = url.split("?")[0].split(".").pop().toLowerCase();
  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  return "unknown";
};



  return (<>
  {user!==null?<div style={{background:"whitesmoke"}} className="min-h-screen border   rounded-xl p-4 mb-4 mt-4 w-[90%] m-auto relative">
      {visible===true?<ProfileCard visible={visible} setisVisible={setisVisible} user={user}/>:null}
      <div onClick={()=>console.log(user)} className="flex items-center justify-evenly py-2 flex-col gap-2  ">
      <h1 className="text-2xl hover:underline cursor-pointer">{user[0].name}'s Dashboard</h1>
      <div className="flex items-center justify-center gap-4">
        <button style={{background:"lime",color:"black"}} onClick={()=>{
          setisVisible(true)
        }} className=" font-bold py-1 rounded-full px-3  shadow-sm shadow-black border border-black hover:scale-90 transition-all hover:shadow-md cursor-pointer">My Profile</button>
       <Link style={{background:"white"}} className="font-bold py-1 rounded-full px-3 shadow-sm shadow-black border border-gray-400 hover:scale-90 transition-all hover:shadow-md cursor-pointer" to="/messages">Chats</Link>

        </div>
      </div>
    {/*label for the section*/}
    <div className="flex flex-col items-normal justify-normal p-2">
    <div className="flex items-normal justify-normal gap-4">
      <span className="font-bold text-lg">Photos and Videos</span>
      <label>(Size upto 20MB)</label>
    </div>
      <span className="font-medium">Pick something that best defines you!</span>
    </div>
    {/*photos and videos section*/}
    {/**/}
    <section style={{background:"lightgray"}} className="flex items-center justify-evenly flex-wrap gap-2 border border-gray-400 py-3 px-3 rounded-xl cursor-pointer">
  
      {user[0].images[0]?(<div className="relative w-30 h-20"> 
   {user[0].images[0].split("?")[0].endsWith("mp4")||user[0].images[0].split("?")[0].endsWith("webm")?<video className="h-20 w-30 object-cover rounded-md" src={user[0].images[0]} autoPlay loop controls={false}></video>:<img className="h-20 w-30 object-cover rounded-md" src={user[0].images[0]} alt="Uploaded" />}

    <FaTrashAlt 
    onClick={()=>DeletImage(user[0].images[0])}
    size={22}
    
      className="absolute top-0 right-0 bg-black text-white rounded-full p-1" 
     
    />
    <FaDownload onClick={(e)=>DownloadMedia(user[0].images[0],e)} size={25} className="absolute bottom-0 left-0 bg-black text-white rounded-full p-1" />
  </div>)       
      :<div onClick={()=>{
        firstImg.current.click()

       }} onChange={()=>setfirstImage(firstImg.current?firstImg.current.files[0]:null)} className="h-20 w-35 border border-gray-400 flex items-center justify-center font-bold text-3xl hover:shadow-sm shadow-black transition-all">
           <input ref={firstImg} className=" hidden" type="file"/>
       <button  className="text-center text-sm flex flex-col ">{firstImage!==null?firstImage.name:"+"}</button>

      </div>}
      {user[0].images[1]?(<div className="relative w-30 h-20"> 
   {user[0].images[1].split("?")[0].endsWith("mp4")||user[0].images[1].split("?")[0].endsWith("webm")?<video className="h-20 w-30 object-cover rounded-md" src={user[0].images[1]} autoPlay loop controls={false}></video>:<img className="h-20 w-30 object-cover rounded-md" src={user[0].images[1]} alt="Uploaded" />}

   
    <FaTrashAlt
    onClick={()=>DeletImage(user[0].images[1])}
    size={22}
    
      className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
     
    />
    <FaDownload onClick={(e)=>DownloadMedia(user[0].images[1],e)} size={25} className="absolute bottom-0 left-0 bg-black text-white rounded-full p-1" />
  </div>) :<div onClick={()=>{
        secondImg.current.click()
       }} onChange={()=>setsecondImage(secondImg.current?secondImg.current.files[0]:null)}
       className="h-20 w-35 border border-gray-400 flex items-center justify-center font-bold text-3xl hover:shadow-sm shadow-black transition-all">
          <input ref={secondImg} className=" hidden" type="file"/>
       <button className="text-center text-sm flex flex-col">{secondImage!==null?secondImage.name:"+"}</button>

      </div>}
      {user[0].images[2]?(<div className="relative w-30 h-20"> 
   {user[0].images[2].split("?")[0].endsWith("mp4")||user[0].images[2].split("?")[0].endsWith("webm")?<video className="h-20 w-30 object-cover rounded-md" src={user[0].images[2]} autoPlay loop controls={false}></video>:<img className="h-20 w-30 object-cover rounded-md" src={user[0].images[2]} alt="Uploaded" />}

   
    <FaTrashAlt
    onClick={()=>DeletImage(user[0].images[2])}
    size={22}
    
      className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
      
    />
    <FaDownload onClick={(e)=>DownloadMedia(user[0].images[2],e)} size={25} className="absolute bottom-0 left-0 bg-black text-white rounded-full p-1" />
  </div>) :<div onClick={()=>{
        thirdImg.current.click()
       }} onChange={()=>setthirdImage(thirdImg.current?thirdImg.current.files[0]:null)} className="h-20 w-35 border border-gray-400 flex items-center justify-center font-bold text-3xl hover:shadow-sm shadow-black transition-all">
           <input ref={thirdImg} className=" hidden" type="file"/>
       <button className="text-center text-sm flex flex-col ">{thirdImage!==null?thirdImage.name:"+"}</button>
      </div>}
{/**/}
      {user[0].images[3]?(<div className="relative w-30 h-20"> 

   {user[0].images[3].split("?")[0].endsWith("mp4")||user[0].images[3].split("?")[0].endsWith("webm")?<video className="h-20 w-30 object-cover rounded-md" src={user[0].images[3]} autoPlay loop controls={false}></video>:<img className="h-20 w-30 object-cover rounded-md" src={user[0].images[3]} alt="Uploaded" />}

    {/* Cancel button in the top-right corner */}
    <FaTrashAlt
    onClick={()=>DeletImage(user[0].images[3])}
    size={22}
   
      className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
      
    />
    <FaDownload onClick={(e)=>DownloadMedia(user[0].images[3],e)} size={25} className="absolute bottom-0 left-0 bg-black text-white rounded-full p-1" />
  </div>) :<div onClick={()=>{
        fourthImg.current.click()
       }} onChange={()=>setfourthImage(fourthImg.current?fourthImg.current.files[0]:null)} className="h-20 w-35 border border-gray-400 flex items-center justify-center font-bold text-3xl hover:shadow-sm shadow-black transition-all" >
         <input ref={fourthImg} className=" hidden" type="file"/>
       <button className="text-center text-sm flex flex-col">{fourthImage!==null?fourthImage.name:"+"}</button>

      </div>}
      {user[0].images[4]?(<div className="relative w-30 h-20"> 
    {user[0].images[4].split("?")[0].endsWith("mp4")||user[0].images[4].split("?")[0].endsWith("webm")?<video className="h-20 w-30 object-cover rounded-md" src={user[0].images[4]} autoPlay loop controls={false}></video>:<img className="h-20 w-30 object-cover rounded-md" src={user[0].images[4]} alt="Uploaded" />}


    <FaTrashAlt
    onClick={()=>DeletImage(user[0].images[4])}
    size={22}
    
      className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
      
    />
    <FaDownload onClick={(e)=>DownloadMedia(user[0].images[4],e)} size={25} className="absolute bottom-0 left-0 bg-black text-white rounded-full p-1" />
  </div>) :<div onClick={()=>{
        fifthImg.current.click()
       }} onChange={()=>setfifthImage(fifthImg.current?fifthImg.current.files[0]:null)} className="h-20 w-35 border border-gray-400 flex items-center justify-center font-bold text-3xl hover:shadow-sm shadow-black transition-all">
         <input ref={fifthImg} className=" hidden" type="file"/>
       <button  className="text-center text-sm flex flex-col">{fifthImage!==null?fifthImage.name:"+"}</button>

      </div>}
       {uploadStatus==="idle" ?<button onClick={UploadFiles} style={{background:"linear-gradient(to right,#9a1f40,#ff3366)"}}  className=" py-1 px-3 rounded-xl text-white border border-gray-400 shadow-sm shadow-black hover:shadow-md" >Upload</button>:<button style={{background:"linear-gradient(to right,#9a1f40,#ff3366)"}}  className="  py-1 px-3 rounded-xl text-white border border-gray-400 shadow-md shadow-black  animate-pulse" >Uploading...</button>}
    </section>
    
   <div style={{background:"lightgray"}} className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl flex items-center justify-center md:justify-end  gap-4">
     <span className="text-md md:text-lg font-bold">Want to edit you Profile</span> 
     <Link style={{background:"deepskyblue"}} className="border w-25 md:w-fit px-3 py-1 rounded-xl  font-bold shadow-sm shadow-black hover:shadow-md hover:scale-90 text-sm" to="/profile-editing">Edit profile</Link>
   </div>
  
  {/* location and address*/}
  <div style={{background:"lightgray"}} className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
  <span className="text-lg font-bold">
      From
    </span>
    <ul>{user[0].location}</ul>
  </div>
  {/*bio/about section*/}
  <div style={{background:"lightgray"}} className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
    <span className="text-lg font-bold">
      About
    </span>
   <p className="">{user[0].about?user[0].about:"Not specified"}</p>
  </div>
  
  {/*interests*/}
  <div style={{background:"lightgray"}} className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
  <span className="text-lg font-bold">
      Interests
    </span>
    <div className="flex items-normal justify-normal gap-3 p-2 flex-wrap">
    {user[0].interests.map((int,index)=>{
      return (<ul style={{border:"1px solid blue"}} className="  px-2 rounded-full ">{int}</ul>)
    })}
  </div>
  </div>
  
  {/*hobbies*/}
  
  <div style={{background:"lightgray"}} className="mt-3 border border-gray-400 p-2 border border-gray-400 rounded-xl">
  <span className="text-lg font-bold">
      Hobbies
    </span>
    <div className="flex items-normal justify-normal gap-3 p-2 flex-wrap">
    {user[0].hobbies.map((int,index)=>{
      return (<ul style={{border:"1px solid blue"}} className="  px-2 rounded-full ">{int}</ul>)
    })}
  </div>
  </div>
  {/*end*/}
      </div>:<div className="h-screen text-3xl flex items-center justify-center bg-white/40">Thanks for your patience!</div>}
 </> );
};

export default ProfileOverview;
