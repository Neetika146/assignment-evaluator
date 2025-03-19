// src/components/Dashboard/AssignmentCard.jsx
import React from "react";

const AssignmentCard = ({ title, score, status }) => {
   return (
      <div className="p-4 border rounded-xl shadow-md bg-white">
         <h3 className="text-lg font-semibold">{title}</h3>
         <p className="text-gray-600">Score: {score}%</p>
         <p
            className={`text-sm mt-2 ${status === "Completed" ? "text-green-500" : "text-yellow-500"
               }`}
         >
            {status}
         </p>
      </div>
   );
};

export default AssignmentCard;
