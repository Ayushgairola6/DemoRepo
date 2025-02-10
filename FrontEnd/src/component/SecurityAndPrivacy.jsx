import {React,useEffect} from "react";
import DataProtectionInfo from "./DataProtecttionInfo";
import ProfilePrivacySettings from "./ProfilePrivacySettings";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import {UseStore} from '../store/store';
import {useNavigate} from 'react-router-dom';
const SecurityAndPrivacy = () => {

  const navigate = useNavigate();
  const {isLoggedIn} = UseStore();

 useEffect(()=>{
     if(isLoggedIn===false){
      navigate("/error")
     }
   },[isLoggedIn])
  return (
    <div className="w-screen h-screen p-5 bg-[url('/background-design.png')] bg-cover bg-no-repeat bg-center">
      <h1 className="w-screen flex justify-center text-3xl mt-2 font-bold">
        Security & Privacy Features
      </h1>
      <ProfilePrivacySettings />
      <TwoFactorAuthentication />
      <DataProtectionInfo />
    </div>
  );
};

export default SecurityAndPrivacy;
