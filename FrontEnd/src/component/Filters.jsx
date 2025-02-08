 import Age from './Age';
import Interests from './InterestAndHobbies';
import SearchPage from './Searchpage';
import { GiChewedHeart } from 'react-icons/gi';
import {useState,useRef} from 'react'
import { UseStore } from '../store/store';
import "./SearchFilter.css"
const Filter =()=>{
  const {get_Profiles,fetchState} = UseStore();
  

  

  return (<>
    <div className="main flex item-center justify-center p-2 ">
    <div className="w-[90%] 


p-2 rounded-lg" >
            
            <SearchPage  />
            <Age />
            <Interests />
          {/*confiotion redning for the btnt*/}
          {fetchState==="pending"? <button className=" text-white bg-gradient-to-r from-[#9a1f40] to-[#ff3366] py-2  mt-5 px-6 rounded-xl shadow-md shadow-black text-sm font-semibold hover:bg-grdient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black  " >Matching....</button>
                         :<button className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white py-2  mt-5 px-6 rounded-xl shadow-md shadow-black text-sm font-semibold  cursor-pointer hover:bg-grdient-to-r hover:from-pink-600 hover:to-pink-700 hover:text-black"
                        onClick={get_Profiles}
                      >
                        Find
                      </button>}
          </div>
 </div>
  </>)
}

export default Filter;
 

 