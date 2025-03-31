import React from "react";

const PlanCard = ({ title, price, features }) => {
  return (
    <div className="w-80 p-6 bg-white  rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 flex flex-col items-center border border-gray-300">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-4xl font-extrabold text-pink-500 my-4">${price}</p>
      <ul className="text-gray-600 mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-pink-500">&#10003;</span> {feature}
          </li>
        ))}
      </ul>
      <button className="w-full bg-pink-400 text-white py-2 rounded-md hover:bg-pink-600">
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;
