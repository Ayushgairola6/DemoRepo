import { useRef ,useEffect} from "react";
import axios from 'axios';
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';

// import './style.css';


export default function LoginForm() {

  

  const {isLoggedIn,setIsloggedIn} = UseStore()
   const navigate = useNavigate();

  useEffect(()=>{
     if(isLoggedIn===true){
       navigate("/ProfileList")
       console.log(isLoggedIn,'login state')
     }
    

  },[isLoggedIn,navigate])

 const EmailRef=useRef();
 const PasswordRef=useRef();


 const handleSubmit = async(e)=>{
    e.preventDefault();


// send the formdata
  const data ={
    email:EmailRef.current.value,
    password:PasswordRef.current.value
  }
try {
    const response = await axios.post("http://localhost:8080/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // set isLogggedIn to true and store the token in the localStorage
    setIsloggedIn(true);
    localStorage.setItem("AuthenticationToken",response.data.token);
  } catch (error) {
    console.error("Error while logging in:", error);
  }

 }

  return (
    <div onClick={()=>console.log(isLoggedIn)} className="min-h-screen flex items-center justify-center  p-6">
  <div className="bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod] shadow-lg rounded-xl p-8 w-full max-w-md">
    <h1 className="text-2xl font-semibold text-center text-gray-800">
      Welcome Back! Ready to continue where you left off?
    </h1>
    <p className="text-gray-600 text-center mt-2">
      Discover your match! Begin with the <strong>Match Chemistry Quiz</strong> after logging in.
    </p>

    <form onSubmit={handleSubmit} className="mt-6">
      <label className="block font-medium text-gray-700">Username/Email</label>
      <input ref={EmailRef}
        type="text"
        name="email"
        
        placeholder="Enter your username or email"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
        required
      />

      <label className="block font-medium text-gray-700 mt-4">Password</label>
      <input ref={PasswordRef}
        type="password"
        name="password"
        
        placeholder="Enter your password"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
        required
      />

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white  px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => (window.location.href = "/register")}
        >
          Sign Up
        </button>
      </div>

      {/* Forgot Password */}
      <p className="text-center text-blue-600 mt-4 hover:underline">
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </form>
  </div>
</div>

  );
}
