import { createContext, useContext, useState, useRef } from 'react';
import axios from 'axios'
export const recommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  // all the states used in search page and its childrens
 const [isLoggedIn,setIsloggedIn] = useState(false)

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedInterests, setSelectedInterest] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [FilteredResults,setFilteredResults] = useState(null);
  const [fetchState,setFetchState] = useState("idle")
  const [matches,setMatches] = useState(null);

  // all the refs used in search page and its childrens
  const StateRef = useRef();
  const chosenCountry = useRef();
  const city = useRef();
  const age = useRef();
  const relationGoal = useRef();
  const hobbies = useRef();
  const Interest = useRef();
const gender =useRef()



    // function to handle state search based on the country
    function handle_State_search(event){
        // only rendering states of chosen country
       const chosenCountry = event.target.value;
      const res = countries.find((elem)=>elem.name === chosenCountry)
       setStates(res.states);  
 
    }


    // fetching cities in a state and country when a new state is selected

async  function get_city(){
                if(StateRef.current.value===""){
                    return ;
                }
                try 
                    { const url = 'https://countriesnow.space/api/v0.1/countries/state/cities';
                     const data ={    "country": `${chosenCountry.current.value}`,
                              "state": `${StateRef.current.value}`}; 
                    const response = await axios.post(url, data); 
                    setCities(response.data.data)
            } 
                catch (error) { console.error(error); 
            }  
 }


//function to fetch profiles for the recommendation page

const GetProfiles = async ()=>{
    try {
        const token = localStorage.getItem("AuthenticationToken")
    const response = await axios.get("http://localhost:8080/feed/profiles",{
      headers: {
        "Content-Type": "multipart/form-data",
        'authorization' :`Bearer ${token}`
      },
    });
    console.log(response.data);
    setMatches(response.data)
  } catch (error) {
    console.error("Error while getting profiles:", error);
  }
}
     

// verify userToken and toggle login state to true
 async function Verify(){
    const token = localStorage.getItem("AuthenticationToken")
     if(!token){return }
     try {
    const response = await axios.get("http://localhost:8080/welcome",{
      headers: {
        "Content-Type": "application/json",
        'authorization' :`Bearer ${token}`
      },
    });
    console.log(response.data);
    setIsloggedIn(true);
  } catch (error) {
    console.error("Error while verifying token:", error);
  }
 }


// function to get filtered profiles from api based on the filters
const get_Profiles = async ()=>{
setFetchState("pending")
    // if not hobbies and interst return
    if(selectedInterests.length===0|| selectedHobbies.length===0){
        alert("Some fields are empty")
        return false;
    }
    //  an onbject of user data
       const UserFilterInput = {
        country:chosenCountry.current.value,
        city:city.current.value,
        state:StateRef.current.value,
        age:age.current.value,
        relationship_goal:relationGoal.current.value,
        interests:selectedInterests,
        hobbies:selectedHobbies,
        gender:gender.current.value
       }

       console.log(UserFilterInput)
       if(!UserFilterInput){
        alert("Please try again");
        return false;
       }

   try {
  const response = await axios.post(`http://localhost:8080/feed/recommendation/filtered/profiles`,UserFilterInput,{
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${'token'}`
    },
     
  });
  console.log(response.data);
  setFilteredResults(response.data);
  setFetchState("fulfilled");
} catch (err) {
  alert(err);
  setFetchState("failed");
  console.log(err);
}

}
 



// Like Profile 
const HandleLike = async(id)=>{
   try {
    const token = localStorage.getItem("AuthenticationToken")
    const response = await axios.post(`http://localhost:8080/like/${id}`,{},{
      headers: {
        
        'authorization' :`Bearer ${token}`
      },
    });
    console.log(response.data);
    
  } catch (error) {
    console.error("Error while sending like:", error);
  }
}



  return (
    <recommendationContext.Provider value={{
     // sending all the states and the functions to the components
      countries, setCountries,
      cities, setCities,
      states, setStates,
      selectedInterests, setSelectedInterest,
      selectedHobbies, setSelectedHobbies
      ,StateRef, chosenCountry, city, age, relationGoal, hobbies, Interest
    ,handle_State_search,get_city,get_Profiles,gender,FilteredResults,fetchState,isLoggedIn,setIsloggedIn,GetProfiles,matches,setMatches,Verify,HandleLike}}>
      {children}
    </recommendationContext.Provider>
  );
};


export const UseStore = () => {
  return useContext(recommendationContext);
};
