import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UseStore } from './store/store';
import axios from 'axios'
import Filter from './component/Filters'
// home page components
import SearchResults from './component/Results';
import Hero from './component/Hero'
import Header from './component/Header';
import Footer from './component/Footer'
import Sidebar from './component/Sidebar'
import RegisterForm from './component/RegisterForm'
import LoginForm from './component/LoginForm'
import AboutUs from './component/AboutUs'
import HowItWorks from './component/HowitWorkspage'
import Virtual from './component/Virtual'
import ProfileList from './component/ProfileList'
import ContactUs from './component/ContactUs'
import BlogArticlesPage from './component/Blogarticles'
import Popup from './component/Popup'
import PlanDesc from './component/PlanDesc'
import VirtualDatesPage from './component/VirtualDatesPage'
import SecurityAndPrivacy from './component/SecurityAndPrivacy'
function App() {
   
   const {Verify} = UseStore()   
   
   useEffect(()=>{
    Verify()
   },[])
  const { get_Profiles, fetchState ,isLoggedIn} = UseStore();
  // state and reference
 

  // function to make the GiChewedHeart follow the cursor
 const [visible,setVisible] = useState(false);

  return (
    <>
      <Router>
          {/*<div className="main">*/}
        <Header visible={visible} setVisible={setVisible} isLoggedIn={isLoggedIn}/>
        {visible===true?<Sidebar isLoggedIn={isLoggedIn} visible={visible} setVisible={setVisible}/>:null}
          <Routes>
          <Route path="/" element={<Hero/>}/>
                <Route  path="/searchpage" element={<Filter/>}/>
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/Register" element={<RegisterForm/>}/>
            <Route path="/Login" element={<LoginForm/>}/>
            <Route path="/About" element={<AboutUs/>}/>
            <Route path="/How-it-works" element={<HowItWorks/>}/>
            <Route path="/ProfileList" element={<ProfileList/>}/>
            <Route path="/error" element={<Popup/>}/>

            <Route path="/Coaching" element={<Virtual/>}/>
            <Route path="/Contact" element={<ContactUs/>}/>
            <Route path="/Blogs" element={<BlogArticlesPage/>}/>
            <Route path="/Plans" element={<PlanDesc/>}/>
            <Route path="/VirtualDates" element={<VirtualDatesPage/>}/>
            <Route path="/SecurityAndPrivacy" element={<SecurityAndPrivacy/>}/>

            


          </Routes>
 {/*</div>*/}
       
      </Router>
    </>
  );
}

export default App;
