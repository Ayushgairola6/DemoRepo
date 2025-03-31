import axios from 'axios';
import Age from "./Age";
import Interests from "./InterestAndHobbies";
import { useState, useRef, useEffect, useContext } from "react";
import { IoMdClose } from 'react-icons/io';
import { FaAngleLeft, FaAngleRight, FaHandHoldingHeart } from 'react-icons/fa';
import { GiWorld, GiCupidonArrow } from "react-icons/gi";
import { IoLocation } from 'react-icons/io5';
import { BiSolidCity } from 'react-icons/bi';
import { recommendationContext, UseStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({ heart, position }) => {
  const navigate = useNavigate();

  // importing from store using context API
  const { countries, setCountries, cities, setCities, states, chosenCountry, city, StateRef, setStates, handle_Search, handle_State_search, get_city, get_Profiles, fetchState } = UseStore();

  // redirecting to the results page
  useEffect(() => {
    if (fetchState === 'fulfilled') {
      navigate("/searchresults");
    }
  }, [fetchState]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const url = 'https://countriesnow.space/api/v0.1/countries/states';
        const response = await axios.get(url).then((res) => {
          setCountries(res.data.data);
        }).catch(error => alert(error));
      } catch (error) {
        console.log(error);
      }
    };
    getCountry();
  }, []);

  return (
    <>
      <h1
        onClick={() => console.log(fetchState)}
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
          color: "black",
          textDecoration: "underline",
        }}
      >
        PREFERENCE
      </h1>

      {/* Responsive Container for dropdowns */}
      <div
        style={{
          border:"1px solid black",
          borderRadius: "0.5rem",
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          // backgroundColor: "#e5e7eb",
        }}
      >
        {/* Country Selection */}
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            maxWidth: "14rem",
          }}
        >
          <label style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Country <GiWorld style={{ color: "#3b82f6" }} />
          </label>
          <select
            ref={chosenCountry}
            onChange={handle_State_search}
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.4)",
            }}
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
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            maxWidth: "14rem",
          }}
        >
          <label style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            State <IoLocation style={{ color: "#10b981" }} />
          </label>
          <select
            onChange={get_city}
            ref={StateRef}
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.4)",
            }}
          >
            <option>State</option>
            {states.map((state) => (
              <option key={state.name}>{state.name}</option>
            ))}
          </select>
        </div>

        {/* City Selection */}
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            maxWidth: "14rem",
          }}
        >
          <label style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            City <BiSolidCity style={{ color: "#8b5cf6" }} />
          </label>
          <select
            ref={city}
            style={{
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.4)",
            }}
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
    </>
  );
};
export default SearchPage;
