import React from 'react';
import './Home.css';
import {useState} from 'react';
import Sidebar from './Sidebar'
import logo from '../../assets/homelogo.webp';
import {CiMenuFries} from 'react-icons/ci';
import {FaHome,FaSearch,FaFire,FaQuestion,FaMobile,FaUser} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import {UseStore} from '../store/store'
function Header({isLoggedIn,setVisible,visible}) {

 const {user} = UseStore()
    // array of objects with each obj containing the name and route of the page
const pages = [{name:"Home",route:"/",icon:<FaHome/>},{name:"Search-Filters",route:"/searchpage",icon:<FaSearch/>},
{name:"Recommendations",route:"/ProfileList",icon:<FaFire/>},
{name:"HowItWorks",route:"/How-it-works",icon:<FaQuestion/>},{name:"Coaching",route:"/Coaching",icon:<FaMobile/>},
{name:isLoggedIn===false?"Register":"Account",route:isLoggedIn===false?"/Register":"/DashBoard",icon:<FaUser/>},{
    name:"MatchQuiz ",route:"/MatchMaking",icon:""
}];

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
           <div className="flex items-center justify-between   ">
                <img className=" rounded-full h-12 w-12" src={logo} alt="LuvLens" onClick={() => window.location.href = '/'} />
              {/*  <label className="font-bold text-xl">
                LuvLens
                </label>*/}
           </div>

             {/* container containgin the navlinks*/}
             <div className="navlinks">
             {pages.map((page,index)=>{
                return (<Link className={`${current.name===page.name?"bg-black text-white shadow-md shadow-black py-1 px-3 rounded-xl text-white":null} flex items-center justify-center gap-1` } onClick={()=>handleStyles(page)}  to={page.route}>{page.name}{page.icon}</Link>)
             })}
             
              {/*   <Link  id="link" to="/searchpage">Search-Filters</Link>
                 <Link  id="link" to="/ProfileList">Recommendations</Link>
                 <Link  id="link" to="/How-it-works">HowItWorks</Link>
                 <Link  id="link" to="/VirtualDating">VirtualDating</Link>*/}
               
                 <select className="w-24"  onChange={(e)=>ChangePage(e)}>
                 <option className="font-bold text-black text-center" value="/">More</option>
                 <option className="font-bold text-black text-center"  value="/Blogs">Blogs</option>
                 <option className="font-bold text-black text-center"  value="/Contact">Contact</option>
                 <option className="font-bold text-black text-center"  value="/About">About us</option>
                 <option className="font-bold text-black text-center"  value="/Plans">Pricing</option>
                 <option className="font-bold text-black text-center"  value="/VirtualDates">VirtualDates</option>
                 <option className="font-bold text-black "  value="/SecurityAndPrivacy">SecurityAndPrivacy</option>



                 </select>


                 
</div>
{/*container for input and button*/}

        
    <div className="flex items-center justify-center gap-2">        
         {user!==null?<Link to="/DashBoard"><img className="rounded-full h-10 w-10" src={user[0].images[0]}/></Link>:null}

          <CiMenuFries className="font-bold" onClick={()=>{
            console.log(visible);
            setVisible(!visible)
          }} size={32} id="sidebarMenu"/>
</div>
        
        </header>
    {/*the sidebar*/}

    </>
    );
}

export default Header;
