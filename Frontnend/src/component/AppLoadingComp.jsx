import React from 'react';
import logo from '../assets/logo1.png'
const AppLoading = ()=>{
	return(<>
		 <div className="min-h-screen bg-white flex flex-col items-center justify-center">
		 	 <img className="rounded-tr-xl rounded-bl-xl shadow-md shadow-black h-30 w-30 animate-pulse" src={logo}/>
		 	 <h1 className="text-white text-3xl font-bold">Fun Starts Here!</h1>
		 </div>

	</>)
}

export default AppLoading;