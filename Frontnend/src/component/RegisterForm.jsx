import  { useState ,useRef,useEffect} from "react";
import { encryptPassword } from "../encryption";
import ProfileForm from "./ProfileForm";
import PhotoUpload from "./PhotoUpload";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo1.png'

const RegisterForm = () => {
  const [registered,setIsRegistered] = useState("idle");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // success or error
 
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(registered === "success"){
      setModalMessage("Registration successful! Redirecting to login...");
      setModalType("success");
      setShowModal(true);
      const timer = setTimeout(() => {
        navigate('/Login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  },[navigate,registered])


  // reference of all the inputs
  const NameRef= useRef()
  const EmailRef= useRef()
  const PasswordRef= useRef()
  const ImageRef= useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Password validation
    if (PasswordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters long");
      setModalMessage("Password must be at least 6 characters long");
      setModalType("error");
      setShowModal(true);
      return;
    }

    // create a new form to store the formdata
    const Form = new FormData();
    if(ImageRef.current.files.length>0){
      Form.append("image",ImageRef.current.files[0])

    }

    Form.append("name",NameRef.current.value);
    Form.append("email",EmailRef.current.value)
    Form.append("password",PasswordRef.current.value)
   

    try {
      setIsRegistered("pending")
      const response = await axios.post("http://localhost:8080/Register", Form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.error) {
        setError(response.data.error);
        setModalMessage(response.data.error);
        setModalType("error");
        setShowModal(true);
        setIsRegistered("idle");
      } else {
        setIsRegistered("success");
      }
    } catch (error) {
      setIsRegistered("idle");
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      setModalMessage(errorMessage);
      setModalType("error");
      setShowModal(true);
    }
  };

  // Modal component
  const Modal = ({ message, type }) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white transform transition-transform duration-300 ease-in-out`}>
      <p className="font-semibold">{message}</p>
    </div>
  );

  return (<>
    {showModal && (
      <Modal message={modalMessage} type={modalType} />
    )}
    <div className="min-h-screen flex items-center justify-center py-5 px-5">
      <div className="bg-gray-200 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="flex items-center justify-center text-center text-3xl font-bold text-gray-800">
          <img className="h-10 w-10 rounded-full" src={logo} alt=''/>
          Your journey starts here
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-bold text-lg">Your Name</label>
            <input
              ref={NameRef}
              type="text"
              name="name"
              className="bg-white w-full mt-1 px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-lg">Email Address</label>
            <input
              ref={EmailRef}
              type="email"
              name="email"
              className="bg-white w-full mt-1 px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold text-lg">Password</label>
            <input
              ref={PasswordRef}
              type="password"
              name="password"
              className="bg-white w-full mt-1 px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              minLength={6}
            />
            <p className="text-sm text-gray-600 mt-1">Password must be at least 6 characters long</p>
          </div>
     
          <PhotoUpload ImageRef={ImageRef} />
          {registered === "pending" ? (
            <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin m-auto"></div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9a1f40] to-[#ff3366] hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:scale-90 shadow-sm shadow-black hover:shadow-md text-black font-bold text-xl py-3 rounded-lg transition duration-300"
              disabled={registered === "pending"}
            >
              Register
            </button>
          )}
        </form>
        <p className="text-center text-gray-700 text-xl font-bold mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500 hover:underline transition duration-300">
            Login 
          </Link>
        </p>
      </div>
    </div>
  </>);

};

export default RegisterForm;
