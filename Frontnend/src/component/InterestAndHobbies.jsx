import { useState } from 'react';
import {FaPen} from 'react-icons/fa';
import {FaBasketball} from 'react-icons/fa6'
import {UseStore} from "../store/store"
const Interests = () => {
    
    const {selectedInterests,setSelectedInterest,selectedHobbies,setSelectedHobbies} = UseStore();

    const hobbies = ["Travel", "Reading", "Music", "Sports", "Cooking", "Photography", "Gaming", "Art", "Hiking", "Fishing",]
    const Interests = ["Movies", "Politics", "Fiction", "Sci-Fi"]

    // function which will add or removed interests from array when chosen
    function handleInterests(interest) {
        setSelectedInterest((prevSelectedInterests) => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter((i) => i !== interest);
            } else {
                return [...prevSelectedInterests, interest];
            }
        });
    }


    //   function to store or remove 
    function handleHobbies(hobby) {
        setSelectedHobbies((prevSelectedhobbies) => {
            if (prevSelectedhobbies.includes(hobby)) {
                return prevSelectedhobbies.filter((i) => i !== hobby);
            } else {
                return [...prevSelectedhobbies, hobby];
            }
        });
    }


    return (<>
      <div className=" shadow-xl border mt-2 flex flex-col gap-6 p-4   rounded-lg shadow-md w-full  mx-auto bg-gray-200">
  
  {/* Hobbies Section */}
  <div>
    <label className="font-semibold flex items-center gap-2 text-gray-700">
      Hobbies <FaPen className="text-blue-500" />
    </label>
    <div className="hobbies flex flex-wrap gap-3 mt-2 ">
      {hobbies.map((hobby, i) => (
        <ul style={{
  backgroundColor: selectedHobbies.includes(hobby) ? "white" : "#e5e7eb",
  color: selectedHobbies.includes(hobby) ? "green" : "red",
  boxShadow: selectedHobbies.includes(hobby)
    ? "0 1px 2px rgba(34, 197, 94, 0.4)"
    : "0 1px 2px rgba(239, 68, 68, 0.4)",
}}

          key={i}
          className={`cursor-pointer px-4 py-2  rounded-md text-md font-bold transition-all duration-300  ${
            selectedHobbies.includes(hobby)
              ? "bg-blue-500 text-green-700 shadow-sm shadow-green-500"
              : "bg-gray-200 text-red-700 shadow-sm shadow-red-500"
          }`}
          onClick={() => handleHobbies(hobby)}
        >
          {hobby}
        </ul>
      ))}
    </div>
  </div>

  {/* Interests Section */}
  <div>
    <label className="font-semibold flex items-center gap-2 text-gray-700">
      Interests <FaBasketball className="text-orange-500" />
    </label>
    <div className="interests flex flex-wrap gap-3 mt-2">
      {Interests.map((int, i) => (
        <ul 
        style={{
          backgroundColor: selectedInterests.includes(int) ? "white" : "#e5e7eb",
          color: selectedInterests.includes(int) ? "green" : "red",
          boxShadow: selectedInterests.includes(int)
            ? "0 1px 2px rgba(34, 197, 94, 0.4)"
            : "0 1px 2px rgba(239, 68, 68, 0.4)",
        }}
          key={i}
          className={`cursor-pointer px-4 py-2  rounded-md text-md font-bold transition-all duration-300 border `}
          onClick={() => handleInterests(int)}
        >
          {int}
        </ul>
      ))}
    </div>
  </div>

</div>




    </>)
}
export default Interests;