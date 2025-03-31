import {React,useEffect} from "react";
import DataProtectionInfo from "./DataProtecttionInfo";
import ProfilePrivacySettings from "./ProfilePrivacySettings";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion'
const SecurityAndPrivacy = () => {

  const navigate = useNavigate();
  const {isLoggedIn} = UseStore();

 useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="w-screen min-h-screen p-5 ">
      <h1 className="w-screen flex justify-center text-3xl mt-2 font-bold">
        Security & Privacy Features
      </h1>
      <ProfilePrivacySettings />
      <TwoFactorAuthentication />
      <DataProtectionInfo />
    </motion.div>
  );
};

export default SecurityAndPrivacy;
