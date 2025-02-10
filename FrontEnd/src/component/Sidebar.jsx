import {IoMdClose} from 'react-icons/io'
import {Link} from 'react-router-dom'

const Sidebar=({setVisible,visible,isLoggedIn})=>{
	return (<>
		 <div className="Sidebar ">
		 <IoMdClose onClick={()=>setVisible(!visible)} size={22} className="close"/>
<Link id="link" className="first" to="/">Home</Link>
                 <Link id="link" to="/About">About us</Link>
                 <Link id="link" to="/searchpage">Search-Filters</Link>
                 <Link id="link" to="/ProfileList">Recommendations</Link>
                 <Link id="link" to="/How-it-works">HowItWorks</Link>
                 <Link id="link" to="/Coaching">VirtualDating</Link>
                 <Link id="link" to="/Contact">Contact</Link>
                 <Link id="link" to="/Blogs">Blog</Link>
                 {isLoggedIn===false?<Link id="link" to='/Register'>Register</Link>:<Link id="link" to="/Account">Account</Link>}
		 </div>


	</>)
}

export default Sidebar;