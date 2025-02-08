import axios from 'axios';
import Age from "./Age";
import Interests from "./InterestAndHobbies";
import { useState, useRef, useEffect ,useContext} from "react";
import { IoMdClose } from 'react-icons/io';
import { FaAngleLeft, FaAngleRight ,FaHandHoldingHeart} from 'react-icons/fa';
import {GiWorld,GiCupidonArrow} from "react-icons/gi"
import {IoLocation} from 'react-icons/io5'
import {BiSolidCity} from 'react-icons/bi'
import {recommendationContext,UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';

const SearchPage = ({heart,position}) => {
    const navigate = useNavigate();
  
// importing from store using context api
    const {countries,setCountries,cities,setCities,states,chosenCountry,city,StateRef,setStates,handle_Search,handle_State_search,get_city,get_Profiles,fetchState} = UseStore();

   //redirecting to the results page 
useEffect(()=>{
   if(fetchState==='fullfilled'){navigate(`/searchresults`)};
  },[fetchState])


    useEffect(() => {
        const getCountry = async () => {
            try {
                const url = 'https://countriesnow.space/api/v0.1/countries/states';
                const response = await axios.get(url).then((res) => {
                setCountries(res.data.data)
                }).catch(error => alert(error))
            } catch (error) {
                console.log(error);
            }
        }
        getCountry()

    }, [])

   

   


    return (<>
     
        {/* container containing the location inputs */}
       
           
<h1
  onClick={() => console.log(fetchState)}
  className="text-3xl font-bold  items-center justify-center gap-2 cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-600 hover:underline"
>
  PREFERENCE 
</h1>

{/* Responsive Container for dropdowns */}
<div className="rounded-lg p-4 flex flex-wrap gap-6 justify-center md:justify-evenly border border-gray-300 shadow-xl bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod] ">
  
  {/* Country Selection */}
  <div className="p-3 rounded-lg shadow-sm max-w-56 md:w-1/3 ">
    <label className="font-semibold flex items-center gap-2">
      Country <GiWorld className="text-blue-500" />
    </label>
    <select
      ref={chosenCountry}
      onChange={handle_State_search}
      className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
    >
      <option>Country</option>
      {countries.map((country) => (
        <option key={country.name} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  </div>

  {/* State Selection */}
  <div className="p-3 rounded-lg shadow-sm max-w-56 md:w-1/3 ">
    <label className="font-semibold flex items-center gap-2">
      State <IoLocation className="text-green-500" />
    </label>
    <select
      onChange={get_city}
      ref={StateRef}
      className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
    >
      <option>State</option>
      {states.map((state) => (
        <option key={state.name}>{state.name}</option>
      ))}
    </select>
  </div>

  {/* City Selection */}
  <div className="p-3 rounded-lg shadow-sm max-w-56 md:w-1/3 ">
    <label className="font-semibold flex items-center gap-2">
      City <BiSolidCity className="text-purple-500" />
    </label>
    <select
      ref={city}
      className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400"
    >
      <option value="Casual">City</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

</div>


        {/*age component*/}
          
        
    </>)
}
export default SearchPage;