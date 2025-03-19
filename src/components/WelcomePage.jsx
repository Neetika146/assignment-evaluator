import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
   const navigate = useNavigate();

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
         <div className="text-center bg-white shadow-lg rounded-2xl p-10 max-w-lg">
            <div className="mb-4">
               <span className="text-5xl text-blue-500">📖</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
               Learning Harbour
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
               Your educational journey begins here. Connect with teachers and access your learning resources in one place.
            </p>

            <div className="flex justify-center gap-4">
               {/* Student Button */}
               <button
                  onClick={() => navigate('/student-dashboard')}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 duration-200 flex items-center gap-2"
               >
                  👨‍🎓 I am a Student
               </button>

               {/* Teacher Button */}
               <button
                  className="px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105 duration-200 flex items-center gap-2"
               >
                  👨‍🏫 I am a Teacher
               </button>
            </div>
         </div>

         <p className="mt-12 text-gray-400 text-sm">
            © 2023 Learning Harbour. All rights reserved.
         </p>
      </div>
   );
};

export default WelcomePage;
