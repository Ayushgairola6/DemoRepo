import  { useState ,useRef,useEffect} from "react";
import { encryptPassword } from "../encryption";
import ProfileForm from "./ProfileForm";
import PhotoUpload from "./PhotoUpload";
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Registration.css'
const RegisterForm = () => {
  const [registered,setIsRegistered] = useState(false);

  const navigate = useNavigate()
 useEffect(()=>{
  if(registered===true){
    navigate('/Login')
  }
 },[navigate,registered])


  // reference of all the inputs
  const NameRef= useRef()
  const EmailRef= useRef()
  const PasswordRef= useRef()
  const GenderRef= useRef()
  const AgeRef= useRef()
  const LocationRef= useRef()
  const InterestsRef = useRef()
  
  const RelationRef= useRef()
  const ImageRef= useRef()

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if the password exists encrypt it
    // let encryptedPassword;
    // if(PasswordRef.current.value){
    // encryptedPassword = await encryptPassword(PasswordRef.current.value);
    // }
    // create a new form to store the formdata
    const Form = new FormData();
    if(ImageRef.current.files.length>0){
    Form.append("image",ImageRef.current.files[0])

    }

    Form.append("name",NameRef.current.value);
    Form.append("email",EmailRef.current.value)
    Form.append("password",PasswordRef.current.value)
    Form.append("gender",GenderRef.current.value)
    Form.append("age",AgeRef.current.value)
    Form.append("location",LocationRef.current.value)
    Form.append("interests",InterestsRef.current.value);
    Form.append("relationshipGoals",RelationRef.current.value)


    // if(ImageRef.current.files[0]){
    // Form.append("image",ImageRef.current.files[0])
    // }

  try {
    const response = await axios.post("http://localhost:8080/Register", Form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    setIsRegistered(true);
  } catch (error) {
    console.error("Error while signing up:", error);
  }
  };

  return (<>
 <div className="min-h-screen  flex items-center justify-center  p-4  ">
      <div className="bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod] shadow-lg rounded-2xl p-8 w-[100%] max-w-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Start Your Journey Today!
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input ref={NameRef}
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"    
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input ref={EmailRef}
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
             
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input ref={PasswordRef}
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              
              required
            />
          </div>
          <ProfileForm GenderRef={GenderRef} AgeRef={AgeRef} RelationRef={RelationRef} InterestsRef={InterestsRef} LocationRef={LocationRef}/>
          <PhotoUpload ImageRef={ImageRef} />
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white font-medium py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/Login"
            className="text-blue-500 hover:underline transition duration-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
 </> );
};

export default RegisterForm;
