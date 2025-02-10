import {Link} from 'react-router-dom'

const Popup =()=>{
	return (<>
		<div className="h-screen w-full flex ">
			<div className="m-auto  p-10 rounded-xl shadow-md shadow-black flex flex-col items-center justify-evenly gap-4 bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod]">
				<h1 className="text-xl">You need an Account to access this feature</h1>
				<div className="flex items-center justify-evenly gap-14 px-2">
					<Link className="bg-green-500 hover:bg-green-600 px-3 shadow-md shadow-black rounded-lg" to="/Login">
					Login
					</Link>
					<Link className="bg-sky-500 hover:bg-sky-600  px-3 rounded-lg shadow-md shadow-black" to="/Register">
					Signup
					</Link>
				</div>
			</div>
		</div>

	</>)
}

export default Popup;