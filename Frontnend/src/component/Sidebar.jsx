import {IoMdClose} from 'react-icons/io'
import {Link,useNavigate} from 'react-router-dom'
const Sidebar=({setVisible,visible,isLoggedIn})=>{
       
   const navigate = useNavigate();
     function ChangePage(e){
      const selectedPage = e.target.value;
      if(selectedPage){
       navigate(selectedPage)

      }
  }
	return (<>
		 <div onClick={()=>setVisible(!visible)} className={`Sidebar z-100  lg:hidden fixed flex flex-col w-64 items-center justify-normal top-0 right-0 h-full  gap-4 bg-gray-200 rounded-lg border transform-transition-transform duration-300 ease-in-out ${visible===true?"-translate-x-0 ":"translate-x-full"}`}>
		 <IoMdClose onClick={()=>setVisible(!visible)} size={22} className="close"/>
<Link id="link" className="first" to="/">Home</Link>
                 {isLoggedIn===false?<Link id="link" to='/Register'>Register</Link>:<Link id="link" to="/DashBoard">Account</Link>}
                 
                 <Link id="link" to="/About">About us</Link>
                 <Link id="link" to="/searchpage">Search-Filters</Link>
                 <Link id="link" to="/ProfileList">Recommendations</Link>
                 <Link id="link" to="/How-it-works">HowItWorks</Link>
                 <Link id="link" to="/Coaching">VirtualDating</Link>
                 <Link id="link" to="/Contact">Contact</Link>
                 <Link id="link" to="/Blogs">Blog</Link>
                 <Link id="link" to="/MatchMaking">MatchQuiz</Link>
                 <Link id="link" to="/Coaching">Coaching</Link>
                 <Link id="link" to="/SecurityAndPrivacy">SecurityAndPrivacy</Link>
                 <Link id="link" to="/Plans">Pricing</Link>
                 
               
		 </div>


	</>)
}

export default Sidebar;