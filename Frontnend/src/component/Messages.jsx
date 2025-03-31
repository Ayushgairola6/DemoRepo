import React, { useState, useEffect,useRef } from "react";
import axios from "axios"; 
import { io } from "socket.io-client";
import {UseStore} from '../store/store';
import {motion} from 'framer-motion'
const Messages = () => {
  const {user} = UseStore()
  const socket = useRef(null)
  const inputRef = useRef(null)

  const [matchedUsers, setMatchedUsers] = useState(null);
  const [roomName,setRoomName] = useState(null)
  const [user1,setUser1] =useState(user[0].id);
  const [user2,setUser2] = useState(null);
  const [messages, setMessages] = useState([]); // New message input
  const [newMessage,setNewMessage] =useState([]);
  useEffect(()=>{
    // get the profiles user got matched with
  const getMatches = async ()=>{

 

    try{///api
     const response = await axios.get("/api/all/matches",{withCredentials:true},{
      headers:{
        "Content-Type":"application/json",
      }
    })
    setMatchedUsers(response.data);
    return response.data;
  }catch(error){
  throw error;
}
}
// function invoking
getMatches()
  },[])

  useEffect(()=>{
    if(matchedUsers && matchedUsers.length>0){
      setSelectedUser(matchedUsers[0]);
    }
  },[matchedUsers])

  const [selectedUser, setSelectedUser] = useState(null); 

useEffect(()=>{
  try{
  
   //socket port
    socket.current = io("/api",{
      withCredentials:true,
    });
   // emit a connection event 
   socket.current.on("connect",()=>{
    //  console.log("Socket connection has been established");
   })

   // emit a join chat event with user 2 data
   if(selectedUser){socket.current.emit("joinChat", { selectedUser })};
   
   socket.current.on("roomJoined",(data)=>{
    setRoomName(data.roomName);
    
   })
  
  // listening to the updated messages that are being currently listened

  socket.current.on("newMessage",(data)=>{
    // console.log(data)
    if(data===null){
      return ;
    }
    setMessages((prev)=>(Array.isArray(prev) ? [...prev, data] : [data]))
  })
  

  }catch(error){
    throw error;
  }

  return () => {
    socket.current.disconnect();
  };
},[io,selectedUser])

//  get chats 
 useEffect(()=>{
  const getChats = async ()=>{

   try{
    const response = await axios.get(`/api/all/chats/${roomName}`,{withCredentials:true},{
      headers:{
        "Content-Type":"application/json"
      }
    })   
  setMessages(response.data)
   }catch(error){
    throw error;
   }




  }
getChats()
  
 },[roomName])



  // Handle sending a new message


  return (
  <motion.div  style={{background:"linear-gradient(135deg , lightgreen,skyblue)"}} initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="flex flex-col lg:flex-row min-h-screen">
  {/* Left Sidebar */}
<div className="lg:w-1/4 max-w-full border border-black shadow-lg overflow-y-auto rounded-lg m-4" style={{ background: "whitesmoke", border: "1px solid black" }}>
  <h2 className="p-4 text-xl lg:text-2xl font-bold text-gray-800">Matches</h2>
  <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
    {matchedUsers !== null && selectedUser !== null ? (
      [...new Map(matchedUsers.map((user) => [user.id, user])).values()].map((user) => (
        <li
          key={user.id}
          className={`flex items-center p-3 lg:p-4 cursor-pointer transition-all rounded-lg hover:bg-black/70 hover:text-white ${
            selectedUser?.id === user.id ? "bg-gray-200" : ""
          }`}
          onClick={() => setSelectedUser(user)}
        >
          <img
            src={user.images[0]}
            alt={user.name}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3 lg:mr-4 border-2 border-gray-300"
          />
          <span className="font-medium text-sm lg:text-md">{user.name}</span>
        </li>
      ))
    ) : (
      <div className="text-center font-bold">
        You don't have any matches
      </div>
    )}
  </ul>
</div>


  {/* Main Chat Area */}
  <div   className="flex-1 flex flex-col rounded-lg shadow-lg bg-white m-4 overflow-hidden  max-h-screen md:max-h-screen lg:max-h-screen">
    {/* Chat Header */}
    <div style={{background:"linear-gradient(to right,red,orange)"}} className="p-4  to-orange-600 text-white flex items-center border-b border-gray-300">
      {selectedUser !== null ? (
        <div className="flex items-center">
          <img
            src={selectedUser.images[0]}
            alt={selectedUser.name}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full mr-2 lg:mr-3 border-2 border-white"
          />
          <span className="text-md lg:text-lg uppercase font-medium">
            {selectedUser.name}
          </span>
        </div>
      ) : (
        <span className="text-lg lg:text-xl font-bold">
          Select a user to chat
        </span>
      )}
    </div>

    {/* Chat Messages */}
    <div className="flex-1 p-4 hp overflow-y-auto bg-gray-50  mb-2 rounded-bl-lg rounded-br-lg">
      {messages.length > 0 && selectedUser !== null ? (
        [...messages,newMessage].map((msg, index) => {
          return (
            <div 
              key={index}
              className={` rounded-tr-xl rounded-bl-xl  mt-4 p-2 ${
                msg.receiver_id === selectedUser.id ? "text-left  " : "text-right"
              }`}
            >
              <label className="font-bold text-lg lg:text-lg ">
              {msg.sender_name}
              </label >
              <ul style={{color:`${msg.receiver_id===selectedUser.id?"green":"red"}`}} className="text-sm font-bold lg:text-lg">{msg.message}</ul>
            </div>
          );
        })
      ) : (
        <span className="text-lg lg:text-2xl font-bold text-center w-full h-full flex items-center justify-center">
          Start a Conversation! Remember to keep it simple
        </span>
      )}
    </div>

    {/* Message Input Area */}
    <div className="p-3  lg:p-4 bg-white border-t border-gray-300 flex items-center flex-col gap-2 md:flex-row lg:flex-row">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="font-bold flex-1 p-2 lg:p-3 border border-black/50 rounded-lg focus:outline-none shadow text-md lg:text-md w-full"
      />
      <button
        onClick={() => {
          if (selectedUser === null || !user) {
            return;
          }
          if(inputRef.current.value===""){
            return ;
          }
          socket.current.emit("message", {
            message: inputRef.current.value,
            roomName,
            sender:user1,
            receiver:selectedUser.id,
            sender_name:user[0].name
          });
          inputRef.current.value = "";
        }} style={{background:"linear-gradient(to right,#9a1f40,#ff3366)"}}
        className=" text-white w-full md:w-20 lg:w-20 font-bold  lg:px-3 lg:py-2 md:px-4 text-md lg:text-lg py-1 text-lg ml-2 lg:ml-4 shadow-md shadow-black hover:text-black rounded-lg transition duration-300 cursor-pointer"
      >
        Send
      </button>
    </div>
  </div>
</motion.div>

  );
};

export default Messages;
