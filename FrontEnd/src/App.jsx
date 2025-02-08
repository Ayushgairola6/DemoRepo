import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UseStore } from './store/store';
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
function App() {
  const { get_Profiles, fetchState } = UseStore();
  // state and reference
 

  // function to make the GiChewedHeart follow the cursor
 const [visible,setVisible] = useState(false);
 const [isLoggedIn,setIsloggedIn] = useState(false)

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
            <Route path="/VirtualDating" element={<Virtual/>}/>
            <Route path="/Contact" element={<ContactUs/>}/>
            <Route path="/Blogs" element={<BlogArticlesPage/>}/>



          </Routes>
 {/*</div>*/}
        <Footer/>
       
      </Router>
    </>
  );
}

export default App;
