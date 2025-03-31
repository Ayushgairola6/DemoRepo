import {Link,useNavigate} from 'react-router-dom'
import {UseStore} from '../store/store'
import {useEffect } from 'react';
const Popup =()=>{
     const navigate = useNavigate();

	const {isLoggedIn} = UseStore()
    useEffect(()=>{
       if(isLoggedIn===true){
       	navigate("/ProfileList")
       } 
    },[isLoggedIn])

	return (<>
		<div className="h-screen w-full flex items-center justify-center px-6">
			<div className="m-auto  p-10 rounded-xl shadow-md shadow-black flex flex-col items-center justify-evenly gap-4 bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod]">
				<h1 className="text-3xl">You need an Account to access this feature</h1>
				<div className="flex items-center justify-evenly gap-14 px-2">
					<Link className="bg-green-500 hover:bg-green-600 px-6 font-bold text-lg py-1 shadow-md shadow-black rounded-lg" to="/Login">
					Login
					</Link>
					<Link className="bg-sky-500 hover:bg-sky-600 py-1 font-bold text-lg px-6 rounded-lg shadow-md shadow-black" to="/Register">
					Signup
					</Link>
				</div>
			</div>
		</div>

	</>)
}

export default Popup;