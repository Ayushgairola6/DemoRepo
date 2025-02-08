import {FaPerson} from 'react-icons/fa6'
import {TbCirclesRelation} from 'react-icons/tb'
import {UseStore} from '../store/store';

const Age = () => {
    const {age,relationGoal,gender} = UseStore();

    return (<>
{/*this outer div contains all the inputs*/}
       <div className=" flex flex-col md:flex-row  items-center justify-evenly p-4  mt-2 border-gray-300 shadow-xl border  rounded-lg shadow-md w-full  mx-auto bg-gradient-to-br  from-[lightgoldenrodyellow] to-[palegoldenrod]">

  {/* Age Selection */}
  <div className="flex flex-col w-full max-w-56">
    <label className="font-semibold flex items-center gap-2 text-gray-700">
      Age <FaPerson className="text-blue-500" />
    </label>
    <select 
      ref={age} 
      name="age" 
      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {[...Array(17)].map((_, i) => (
        <option key={i} value={i + 18}>{i + 18}</option>
      ))}
    </select>
  </div>

  {/* Relationship Goals Selection */}
  <div className="flex flex-col w-full max-w-56">
    <label className="font-semibold flex items-center gap-2 text-gray-700">
      Relationship Goals <TbCirclesRelation className="text-green-500" />
    </label>
    <select 
      ref={relationGoal} 
      name="relationGoal" 
      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="Casual">Casual</option>
      <option value="Short-term">Short-term</option>
      <option value="Long-term-open-to-short">Long-term-open-to-short</option>
      <option value="Marriage">Marriage</option>
      <option value="We'll figure it out">We'll figure it out</option>
      <option value="Looking for friends">Looking for friends</option>
    </select>
  </div>

  {/* Gender Selection */}
  <div className="flex flex-col w-full max-w-56">
    <label className="font-semibold flex items-center gap-2 text-gray-700">
      Gender <TbCirclesRelation className="text-purple-500" />
    </label>
    <select 
      ref={gender} 
      name="gender" 
      className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <option value="Straight">Straight</option>
      <option value="Non-Binary">Non-Binary</option>
      <option value="Transgender">Transgender</option>
    </select>
  </div>

</div>



    </>)
}

export default Age;