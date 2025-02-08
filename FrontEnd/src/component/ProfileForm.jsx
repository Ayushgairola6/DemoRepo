import { useState ,useRef} from "react";

const ProfileForm = ({GenderRef,AgeRef,RelationRef,InterestsRef,LocationRef}) => {
 

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
    Personal Profile
  </h3>
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700 font-medium">Gender</label>
      <select ref={GenderRef}
        name="gender"
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
       
        required
      >
        <option value="">Select...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div>
      <label className="block text-gray-700 font-medium">Age</label>
      <input ref={AgeRef}
        type="number"
        name="age"
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
     
        required
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium">Location</label>
      <input ref={LocationRef}
        type="text"
        name="location"
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"

        required
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium">Interests</label>
      <textarea
      ref={InterestsRef}
        name="interests"
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        rows="3"
   
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium">Relationship Goals</label>
      <textarea
      ref={RelationRef}
        name="relationshipGoals"
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        rows="3"
   
      />
    </div>
  </div>
</div>

  );
};

export default ProfileForm;
