 import Age from './Age';
import Interests from './InterestAndHobbies';
import SearchPage from './Searchpage';
import { GiChewedHeart } from 'react-icons/gi';
import {useState,useRef} from 'react'
import { UseStore } from '../store/store';
import "./SearchFilter.css"
import {motion} from 'framer-motion'
const Filter =()=>{
  const {get_Profiles,fetchState} = UseStore();
  

  

  return (<>
    <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="main flex item-center bg-gradient-to-r from-pink-200 to-lime-200 justify-center p-2 ">
    <div className="w-[90%] 


p-2 rounded-lg" >
            
            <SearchPage  />
            <Age />
            <Interests />
          {/*confiotion redning for the btnt*/}
          {fetchState === "pending" ? (
  <button
    style={{
      backgroundImage: "linear-gradient(to right, #9a1f40, #ff3366)",
      fontWeight: "bold",
      fontSize: "1.125rem",
      color: "white",
      padding: "0.25rem 1.5rem",
      borderRadius: "0.75rem",
      marginTop: "2.5rem",
      marginBottom: "2.5rem",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
      transition: "all 0.3s",
    }}
  >
    Matching....
  </button>
) : (
  <button
    style={{
      backgroundImage: "linear-gradient(to right, #9a1f40, #ff3366)",
      fontWeight: "bold",
      fontSize: "1.125rem",
      color: "white",
      padding: "0.25rem 1.5rem",
      borderRadius: "0.75rem",
      marginTop: "2.5rem",
      marginBottom: "2.5rem",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
      transition: "all 0.3s",
    }}
    onClick={get_Profiles}
  >
    Find
  </button>
)}

          </div>
 </motion.div>
  </>)
}

export default Filter;
 

 