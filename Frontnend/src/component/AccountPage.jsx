import {useEffect,useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import ProfileOverview from "./ProfileOverview";

import VirtualDatePlanning from "./VirtualDatePlanning";
import ProfileEditing from "./ProfileEditing";
import Recommendations from "./Recommendations";
import {UseStore} from '../store/store'
// import logo1 from "./assets/logo1.png";
import {motion} from 'framer-motion'
const UserAccount = ()=>{
const {GetUser} = UseStore();
     useEffect(()=>{
          GetUser();
     },[])
     const {user,setUser} = UseStore()
    



	return (<>
		<motion.div style={{background:"linear-gradient(135deg,lightskyblue,lightpink)"}} initial={{opacity:0}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="bg-gradient-to-br from-yellow-200 to-green-200 p-2">
     <ProfileOverview user={user} />
    </motion.div>
	</>)
}

export default UserAccount;