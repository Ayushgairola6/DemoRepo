import React from 'react';
import './Home.css';
import {useState} from 'react';
import Sidebar from './Sidebar'
import logo from '../../assets/homelogo.webp';
import {CiMenuFries} from 'react-icons/ci';
import {FaHome,FaSearch,FaFire,FaQuestion,FaMobile,FaUser} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'

function Header({isLoggedIn,setVisible,visible}) {


    // array of objects with each obj containing the name and route of the page
const pages = [{name:"Home",route:"/",icon:<FaHome/>},{name:"Search-Filters",route:"/searchpage",icon:<FaSearch/>},
{name:"Recommendations",route:"/ProfileList",icon:<FaFire/>},
{name:"HowItWorks",route:"/How-it-works",icon:<FaQuestion/>},{name:"VirtualDating",route:"/VirtualDating",icon:<FaMobile/>},
{name:"Register",route:"/Register",icon:<FaUser/>}];

// the useNavigate hook
   const navigate = useNavigate();
  const [current,setCurrent] = useState(pages[0])

// function which navigates to page on ChangePage on select options
    function ChangePage(e){
        setCurrent(pages[0])
      const selectedPage = e.target.value;
      if(selectedPage){
       navigate(selectedPage)

      }
  }


 // to style the navbar

 function handleStyles(page){
  if(page){
    setCurrent((prev)=>page)
  }

 }




    return (
        <>
        <header className="main-header ">
           {/*the logo*/}
           <div className="flex items-center justify-center gap-1 text-xl">
                <img className=" rounded-full" src={logo} alt="LuvLens" onClick={() => window.location.href = '/'} />
                {/*<Link to="/">
                LuvLens
                </Link>*/}
           </div>

             {/* container containgin the navlinks*/}
             <div className="navlinks">
             {pages.map((page,index)=>{
                return (<Link className={`${current.name===page.name?"bg-gradient-to-r from-[#9a1f40] to-[#ff3366] shadow-md shadow-black py-1 px-3 rounded-xl text-white":null} flex items-center justify-center gap-1` } onClick={()=>handleStyles(page)}  to={page.route}>{page.name}{page.icon}</Link>)
             })}
             
              {/*   <Link  id="link" to="/searchpage">Search-Filters</Link>
                 <Link  id="link" to="/ProfileList">Recommendations</Link>
                 <Link  id="link" to="/How-it-works">HowItWorks</Link>
                 <Link  id="link" to="/VirtualDating">VirtualDating</Link>*/}
               
                 <select  onChange={(e)=>ChangePage(e)}>
                 <option className="font-bold " value="/">More</option>
                 <option className="font-bold "  value="/Blogs">Blogs</option>
                 <option className="font-bold "  value="/Contact">Contact</option>
                 <option className="font-bold "  value="/About">About us</option>


                 </select>


                 
</div>
{/*container for input and button*/}
<div className="Search">
<input placeholder="Search..." type="text"/>
          <button className="bg-gradient-to-r from-[#9a1f40] to-[#ff3366] text-white ">
          Search
          </button>
          </div>
          <CiMenuFries onClick={()=>{
            console.log(visible);
            setVisible(!visible)
          }} size={22} id="sidebarMenu"/>

        </header>
    {/*the sidebar*/}

    </>
    );
}

export default Header;
