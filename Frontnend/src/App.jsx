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
import PlanPage from './component/PlanPage'
import VirtualDatesPage from './component/VirtualDatesPage'
import SecurityAndPrivacy from './component/SecurityAndPrivacy'
import UserAccount from './component/AccountPage'
import ProfileEditing from './component/ProfileEditing'
import MatchMaking from './component/MatchMakingQuiz'
import Messages from './component/Messages.jsx'
import Quizres from './component/QuizResults'
import AppLoading from './component/AppLoadingComp'
function App() {
   
  const [loaded,setLoaded] = useState(false);
   const {Verify} = UseStore()   
   
   
  const { get_Profiles, fetchState ,isLoggedIn} = UseStore();
  // state and reference
 

  // function to make the GiChewedHeart follow the cursor
 const [visible,setVisible] = useState(false);

 useEffect(()=>{
     setTimeout(()=>{
      setLoaded(true);
     },4000)
 },[loaded])

   

  return (
    <>
      <Router>
        
        {loaded===true?(<><Header visible={visible} setVisible={setVisible} isLoggedIn={isLoggedIn}/>
                       <Sidebar isLoggedIn={isLoggedIn} visible={visible} setVisible={setVisible}/>
                      <Routes>
                       <Route path="/" element={ <Hero/>}/>
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
                                   <Route path="/Plans" element={<PlanPage/>}/>
                                   <Route path="/VirtualDates" element={<VirtualDatesPage/>}/>
                                   <Route path="/SecurityAndPrivacy" element={<SecurityAndPrivacy/>}/>
                                   <Route path="/DashBoard" element={<UserAccount/>}/>
                                   <Route path="/profile-editing"  element={<ProfileEditing/>}/>
                                   <Route path="/MatchMaking"  element={<MatchMaking/>}/>
                                   <Route path="/messages"  element={<Messages/>}/>
                                   <Route path="/quizResult"  element={<Quizres/>}/>
                        </Routes>
                       <Footer/></>):<AppLoading/>}
      </Router>
    </>
  );
}

export default App;
