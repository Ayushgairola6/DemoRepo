import { createContext, useContext, useState, useRef,useEffect } from 'react';
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
   const [user,setUser] = useState(null)
   const [quizResponse,setQuizResponse] = useState("idle");
  const [matchFound,setMatchFound] = useState("idle");
  const [matchedUser,setMatchedUser] = useState("")
  const [quizMatch,setQuizMatch] = useState(null)
  const [uploadStatus,setUploadStatus] = useState("idle")

  // all the refs used in search page and its childrens
  const StateRef = useRef();
  const chosenCountry = useRef();
  const city = useRef();
  const age = useRef();
  const relationGoal = useRef();
  const hobbies = useRef();
  const Interest = useRef();
const gender =useRef()
// verify userToken and toggle login state to true
 // Verify User Login
 async function Verify() {
  const token = localStorage.getItem("auth_token")

  try {
    const response = await axios.post(
      "http://localhost:8080/verify",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    if (response.data.message === "Token Verified") {
      setIsloggedIn(true);
    }
  } catch (error) {
    throw error;
  }
}

// Get User Data
const GetUser = async () => {
  const token = localStorage.getItem("auth_token")

  try {
    const response = await axios.get(
      "http://localhost:8080/profile/data",
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    console.log("User Data:", response.data);
    setUser(response.data);
  } catch (error) {
    console.log(error, "error in getting user data");
    throw new Error(error);
  }
};

// Use Effect for Verification and Data Fetching
useEffect(() => {
  Verify();
  if (isLoggedIn === true) {
    GetUser();
  }
}, [isLoggedIn]);

// Handle State Search
function handle_State_search(event) {
  const chosenCountry = event.target.value;
  const res = countries.find((elem) => elem.name === chosenCountry);
  setStates(res.states);
}

// Fetch Cities Based on Country and State
async function get_city() {
  if (StateRef.current.value === "") return;

  try {
    const url = "https://countriesnow.space/api/v0.1/countries/state/cities";
    const data = {
      country: `${chosenCountry.current.value}`,
      state: `${StateRef.current.value}`,
    };
    const response = await axios.post(url, data);
    setCities(response.data.data);
  } catch (error) {
    throw error;
  }
}

// Fetch Profiles for Recommendations
const GetProfiles = async () => {
  const token = localStorage.getItem("auth_token")

  try {
    const response = await axios.get(
      "http://localhost:8080/feed/profiles",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    setMatches(response.data);
  } catch (error) {
    throw error;
  }
};

// Fetch Filtered Profiles Based on Filters
const get_Profiles = async () => {
  setFetchState("pending");
  const token = localStorage.getItem("auth_token")

  if (selectedInterests.length === 0 || selectedHobbies.length === 0) {
    alert("Some fields are empty");
    return false;
  }

  const UserFilterInput = {
    country: chosenCountry.current.value,
    city: city.current.value,
    state: StateRef.current.value,
    age: age.current.value,
    relationship_goal: relationGoal.current.value,
    interests: selectedInterests,
    hobbies: selectedHobbies,
    gender: gender.current.value,
  };

  if (!UserFilterInput) {
    alert("Please try again");
    return false;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/feed/recommendation/filtered/profiles",
      UserFilterInput,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    setFetchState("fulfilled");
    setFilteredResults(response.data);
  } catch (err) {
    setFetchState("failed");
    console.log(err);
  }
};
// Handle Like Action
const HandleLike = async (id, image) => {
  const token = localStorage.getItem("auth_token")

  try {
    const response = await axios.post(
      `http://localhost:8080/like/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (response.data.message === "It's a match!") {
      setMatchFound("Matched");
      setMatchedUser(image);
      setTimeout(() => {
        setMatchFound("idle");
        setMatchedUser("");
      }, 5000);
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Handle Quiz Response Submission
const handleResponse = async (response) => {
  setQuizResponse("Updating...");
  const token = localStorage.getItem("auth_token")

  try {
    const data = await axios.post(
      "http://localhost:8080/quiz/response",
      response,
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    setQuizMatch(data.data);
    setQuizResponse("successful");

    setTimeout(() => {
      setQuizResponse("idle");
    }, 3000);
  } catch (error) {
    setQuizResponse("idle");
    console.log(error);
    throw error;
  }
};

// Upload Media Function
async function UploadMedia(Form) {
  const token = localStorage.getItem("auth_token")
  try {
    setUploadStatus("initialized");

    const response = await axios.post(
      "http://localhost:8080/media/upload/images",
      Form,
      {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    setUploadStatus("idle");
    setUser(response.data);
  } catch (error) {
    throw error;
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
    ,handle_State_search,get_city,get_Profiles,gender,FilteredResults,setFilteredResults,fetchState,setFetchState,isLoggedIn,setIsloggedIn,GetProfiles,matches,setMatches,Verify,HandleLike,user,setUser,handleResponse,quizResponse ,matchFound,setMatchFound,matchedUser,quizMatch,setQuizMatch,UploadMedia,uploadStatus,GetUser}}>
      {children}
    </recommendationContext.Provider>
  );
};


export const UseStore = () => {
  return useContext(recommendationContext);
};
