import {MdCancel} from 'react-icons/md'


const ErrorComp = ({setVisible,visible})=>{
	return (<>
		 <div className="bg-white text-sky-700 absolute  z-99 w-65 h-32 border-2 border-sky-400 rounded-xl flex items-center justify-center font-bold p-4">
		 	<span className=" rounded-xl ">These feature will be available in the future updates !
                Thank you for your patience
                <MdCancel onClick={()=>setVisible(!visible)} size={22} color="red"/>
		 	</span>
		 	

		 </div>

	</>)
}

export default ErrorComp;