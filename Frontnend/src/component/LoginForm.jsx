import { useRef ,useEffect,useState} from "react";
import axios from 'axios';
import {UseStore} from '../store/store';
import {useNavigate,Link} from 'react-router-dom';

// import './style.css';


export default function LoginForm() {
  const [loginState,setLoginState] = useState('idle')
  const [visible,setVisible] = useState(false);

  const {isLoggedIn,setIsloggedIn} = UseStore()
   const navigate = useNavigate();

  useEffect(()=>{
     if(isLoggedIn===true){
       navigate("/DashBoard")
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
  setLoginState("pending")
    const response = await axios.post("http://localhost:8080/login", data,{withCredentials:true}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("auth_token",response.data.token);
    // set isLogggedIn to true and store the token in the localStorage
    setIsloggedIn(true);
    setLoginState("success")
   const time= setTimeout(()=>{
     setLoginState("idle")
    },5000)

    return clearTimeout(time);
  } catch (error) {
     throw new Error(error)
  }

 }

  return (
    <div  className="min-h-screen flex items-center justify-center  p-6">
  <div className="bg-gray-200 shadow-lg rounded-xl p-8 w-full max-w-md">
    <h1 className="text-3xl  text-center text-gray-800">
      Welcome Back! Ready to continue where you left off?
    </h1>

    
    <form onSubmit={handleSubmit} className="mt-8">
      <label className="block font-bold text-lg">Your Email address</label>
      <input ref={EmailRef}
        type="text"
        name="email"
        
        placeholder="Enter your username or email"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
        required
      />

      <label className="block font-bold text-lg mt-8">Password</label>
      <input ref={PasswordRef}
        type={`${visible===true?"text":"password"}`}
        name="password"
  
        placeholder="Enter your password"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
        required
      />

      <div className="flex justify-center gap-4 mt-8">
      {loginState==="idle"?<button type="submit"
      className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] font-bold text-lg hover:bg-gradient-to-r hover:from-pink-600
      hover:to-purple-600 hover:scale-90 shadow-sm shadow-black
      hover:shadow-md text-white  px-6 py-1 
      hover:bg-blue-700 transition-all rounded-xl"
      > Login </button>:<div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full
     animate-spin "></div>} <Link to="/register" className="border border-gray-600 font-bold text-lg text-black
      px-6 py-2 rounded-xl hover:bg-black hover:text-white transition-all hover:scale-90 "
          
        > Sign Up </Link> </div>

      {/* Forgot Password */}
      <p className="text-center text-blue-600 mt-4 hover:underline">
        {/*<Link to="/forgot-password">Forgot Password?</Link>*/}
      </p>
    </form>
  </div>
</div>

  );
}
