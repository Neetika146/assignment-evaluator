// //// src/components/Dashboard/StudentDashboard.jsx
// //import React from "react";
// //import { useNavigate } from "react-router-dom";
// //import AssignmentCard from "./AssignmentCard";
// //import { Line } from "react-chartjs-2";
// //import './Dashboard.css';

// ////import { Button } from "@/components/ui/Button";
// //import MyChart from "./MyChart";
// //import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend
// //} from 'chart.js';

// //ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend
// //);



// //const StudentDashboard = () => {
// //   return (
// //      <div className="p-6">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-4">
// //            <div>
// //               <h1 className="text-2xl font-bold">Student Dashboard</h1>
// //               <p className="text-gray-500">Track your progress and assignments</p>
// //            </div>
// //            {/** yhan button tha */}
// //         </div>

// //         {/* Assignments Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //            {/* Assignment Card */}
// //            <div className="bg-white p-4 rounded-lg shadow-md">
// //               <div className="flex justify-between items-center">
// //                  <div>
// //                     <h2 className="font-semibold">Mathematics Assignment 1</h2>
// //                     <p className="text-gray-400">Mathematics</p>
// //                  </div>
// //                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
// //                     Completed
// //                  </span>
// //               </div>

// //               <div className="mt-2">
// //                  <p className="text-sm text-gray-600">Score</p>
// //                  <div className="w-full bg-gray-200 rounded h-2">
// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
// //                  </div>
// //                  <p className="text-sm text-gray-600 mt-1">85%</p>
// //               </div>

// //               <p className="text-sm mt-2">
// //                  <span className="font-medium">Feedback:</span> Good understanding of calculus concepts
// //               </p>
// //               <p className="text-sm text-gray-400 mt-1">Due: 1/3/2024</p>
// //            </div>

// //            {/* Physics Lab Report */}
// //            <div className="bg-white p-4 rounded-lg shadow-md">
// //               <div className="flex justify-between items-center">
// //                  <div>
// //                     <h2 className="font-semibold">Physics Lab Report</h2>
// //                     <p className="text-gray-400">Physics</p>
// //                  </div>
// //                  <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded">
// //                     Needs Review
// //                  </span>
// //               </div>

// //               <div className="mt-2">
// //                  <p className="text-sm text-gray-600">Score</p>
// //                  <div className="w-full bg-gray-200 rounded h-2">
// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
// //                  </div>
// //                  <p className="text-sm text-gray-600 mt-1">72%</p>
// //               </div>

// //               <p className="text-sm mt-2">
// //                  <span className="font-medium">Feedback:</span> Needs more detailed experimental analysis
// //               </p>
// //               <p className="text-sm text-gray-400 mt-1">Due: 5/3/2024</p>
// //            </div>

// //            {/* Chemistry Assignment */}
// //            <div className="bg-white p-4 rounded-lg shadow-md">
// //               <div className="flex justify-between items-center">
// //                  <div>
// //                     <h2 className="font-semibold">Chemistry Assignment 3</h2>
// //                     <p className="text-gray-400">Chemistry</p>
// //                  </div>
// //                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
// //                     Pending
// //                  </span>
// //               </div>

// //               <p className="text-sm text-gray-400 mt-1">Due: 10/3/2024</p>
// //            </div>
// //         </div>

// //         {/* Performance and Subject Progress Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
// //            {/* Performance Trend */}
// //            <div className="bg-white p-4 rounded-lg shadow-md">
// //               <h2 className="text-lg font-semibold mb-2">Performance Trend</h2>
// //               <MyChart />
// //            </div>

// //            {/* Subject Progress */}
// //            <div className="bg-white p-4 rounded-lg shadow-md">
// //               <h2 className="text-lg font-semibold mb-2">Subject Progress</h2>

// //               {/* Mathematics */}
// //               <div className="mb-4">
// //                  <div className="flex justify-between text-sm">
// //                     <span>Mathematics</span>
// //                     <span>85%</span>
// //                  </div>
// //                  <div className="w-full bg-gray-200 rounded h-2">
// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
// //                  </div>

// //                  <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
// //                  <ul className="text-sm list-disc ml-5 text-gray-600">
// //                     <li>Complex Integration</li>
// //                     <li>Differential Equations</li>
// //                  </ul>

// //                  <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
// //                  <ul className="text-sm list-disc ml-5 text-blue-500">
// //                     <li>Khan Academy - Calculus</li>
// //                     <li>MIT OpenCourseWare - Advanced Math</li>
// //                  </ul>
// //               </div>

// //               {/* Physics */}
// //               <div>
// //                  <div className="flex justify-between text-sm">
// //                     <span>Physics</span>
// //                     <span>72%</span>
// //                  </div>
// //                  <div className="w-full bg-gray-200 rounded h-2">
// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
// //                  </div>

// //                  <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
// //                  <ul className="text-sm list-disc ml-5 text-gray-600">
// //                     <li>Quantum Mechanics</li>
// //                     <li>Electromagnetism</li>
// //                  </ul>

// //                  <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
// //                  <ul className="text-sm list-disc ml-5 text-blue-500">
// //                     <li>Physics Lab Techniques</li>
// //                     <li>Video: Understanding Wave Functions</li>
// //                  </ul>
// //               </div>
// //            </div>
// //         </div>
// //      </div>
// //   );
// //};

// //export default StudentDashboard;


// // src/components/Dashboard/StudentDashboard.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import AssignmentCard from "./AssignmentCard";
// import { Line } from "react-chartjs-2";
// import './Dashboard.css';

// import MyChart from "./MyChart";
// import {
//    Chart as ChartJS,
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    Title,
//    Tooltip,
//    Legend
// } from 'chart.js';

// ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    Title,
//    Tooltip,
//    Legend
// );

// const StudentDashboard = () => {
//    const navigate = useNavigate();

//    return (
//       <div className="p-6">
//          {/* Header */}
//          <div className="flex justify-between items-center mb-4">
//             <div>
//                <h1 className="text-3xl font-extrabold text-blue-600">📚 Student Dashboard</h1>
//                <p className="text-gray-500">Track your progress and assignments with ease</p>
//             </div>
//             <button
//                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
//                onClick={() => navigate('/upload-assignment-type')}
//             >
//                Upload Assignment
//             </button>
//          </div>

//          {/* Assignments Section */}
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Assignment Card */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                <div className="flex justify-between items-center">
//                   <div>
//                      <h2 className="font-semibold">Mathematics Assignment 1</h2>
//                      <p className="text-gray-400">Mathematics</p>
//                   </div>
//                   <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
//                      Completed
//                   </span>
//                </div>

//                <div className="mt-2">
//                   <p className="text-sm text-gray-600">Score</p>
//                   <div className="w-full bg-gray-200 rounded h-2">
//                      <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">85%</p>
//                </div>

//                <p className="text-sm mt-2">
//                   <span className="font-medium">Feedback:</span> Good understanding of calculus concepts
//                </p>
//                <p className="text-sm text-gray-400 mt-1">Due: 1/3/2024</p>
//             </div>

//             {/* Physics Lab Report */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                <div className="flex justify-between items-center">
//                   <div>
//                      <h2 className="font-semibold">Physics Lab Report</h2>
//                      <p className="text-gray-400">Physics</p>
//                   </div>
//                   <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded">
//                      Needs Review
//                   </span>
//                </div>

//                <div className="mt-2">
//                   <p className="text-sm text-gray-600">Score</p>
//                   <div className="w-full bg-gray-200 rounded h-2">
//                      <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">72%</p>
//                </div>

//                <p className="text-sm mt-2">
//                   <span className="font-medium">Feedback:</span> Needs more detailed experimental analysis
//                </p>
//                <p className="text-sm text-gray-400 mt-1">Due: 5/3/2024</p>
//             </div>

//             {/* Chemistry Assignment */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                <div className="flex justify-between items-center">
//                   <div>
//                      <h2 className="font-semibold">Chemistry Assignment 3</h2>
//                      <p className="text-gray-400">Chemistry</p>
//                   </div>
//                   <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
//                      Pending
//                   </span>
//                </div>

//                <p className="text-sm text-gray-400 mt-1">Due: 10/3/2024</p>
//             </div>
//          </div>

//          {/* Performance and Subject Progress Section */}
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             {/* Performance Trend */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                <h2 className="text-lg font-semibold mb-2">Performance Trend</h2>
//                <MyChart />
//             </div>

//             {/* Subject Progress */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                <h2 className="text-lg font-semibold mb-2">Subject Progress</h2>
//                {/* Mathematics */}
//                <div className="mb-4">
//                   <div className="flex justify-between text-sm">
//                      <span>Mathematics</span>
//                      <span>85%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded h-2">
//                      <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
//                   </div>

//                   <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
//                   <ul className="text-sm list-disc ml-5 text-gray-600">
//                      <li>Complex Integration</li>
//                      <li>Differential Equations</li>
//                   </ul>

//                   <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
//                   <ul className="text-sm list-disc ml-5 text-blue-500">
//                      <li>Khan Academy - Calculus</li>
//                      <li>MIT OpenCourseWare - Advanced Math</li>
//                   </ul>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default StudentDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentCard from "./AssignmentCard";
import MyChart from "./MyChart";
import './Dashboard.css';

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
} from 'chart.js';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);


const StudentDashboard = () => {
   const navigate = useNavigate();
   const [extractedText, setExtractedText] = useState("");
   const [filename, setFilename] = useState("");

   // Fetch the latest extracted text
   useEffect(() => {
      fetch("http://127.0.0.1:5000/get_text")
         .then((response) => response.json())
         .then((data) => {
            if (data.text) {
               setExtractedText(data.text);
               setFilename(data.filename);
            } else {
               setExtractedText("No extracted text available.");
            }
         })
         .catch((error) => console.error("Error fetching text:", error));
   }, []);

   return (
      <div className="p-6">
         {/* Header */}
         <div className="flex justify-between items-center mb-4">
            <div>
               <h1 className="text-3xl font-extrabold text-blue-600">📚 Student Dashboard</h1>
               <p className="text-gray-500">Track your progress and assignments with ease</p>
            </div>
            <button
               className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
               onClick={() => navigate('/upload-assignment-type')}
            >
               Upload Assignment
            </button>
         </div>

         {/* Assignments Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assignment Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <h2 className="font-semibold">Mathematics Assignment 1</h2>
                     <p className="text-gray-400">Mathematics</p>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                     Completed
                  </span>
               </div>

               <div className="mt-2">
                  <p className="text-sm text-gray-600">Score</p>
                  <div className="w-full bg-gray-200 rounded h-2">
                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">85%</p>
               </div>

               <p className="text-sm mt-2">
                  <span className="font-medium">Feedback:</span> Good understanding of calculus concepts
               </p>
               <p className="text-sm text-gray-400 mt-1">Due: 1/3/2024</p>
            </div>

            {/* Physics Lab Report */}
            <div className="bg-white p-4 rounded-lg shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <h2 className="font-semibold">Physics Lab Report</h2>
                     <p className="text-gray-400">Physics</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded">
                     Needs Review
                  </span>
               </div>

               <div className="mt-2">
                  <p className="text-sm text-gray-600">Score</p>
                  <div className="w-full bg-gray-200 rounded h-2">
                     <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">72%</p>
               </div>

               <p className="text-sm mt-2">
                  <span className="font-medium">Feedback:</span> Needs more detailed experimental analysis
               </p>
               <p className="text-sm text-gray-400 mt-1">Due: 5/3/2024</p>
            </div>

            {/* Chemistry Assignment */}
            <div className="bg-white p-4 rounded-lg shadow-md">
               <div className="flex justify-between items-center">
                  <div>
                     <h2 className="font-semibold">Chemistry Assignment 3</h2>
                     <p className="text-gray-400">Chemistry</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                     Pending
                  </span>
               </div>

               <p className="text-sm text-gray-400 mt-1">Due: 10/3/2024</p>
            </div>
         </div>

         {/* Extracted Text Section */}
         <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-2">📄 Extracted Report</h2>
            {filename && <p className="text-gray-500 mb-2">Latest Report: {filename}</p>}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
               <pre className="whitespace-pre-wrap text-sm text-gray-800">{extractedText}</pre>
            </div>
         </div>

         {/* Performance and Subject Progress Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Performance Trend */}
            <div className="bg-white p-4 rounded-lg shadow-md">
               <h2 className="text-lg font-semibold mb-2">📈 Performance Trend</h2>
               <MyChart />
            </div>

            {/* Subject Progress */}
            <div className="bg-white p-4 rounded-lg shadow-md">
               <h2 className="text-lg font-semibold mb-2">📌 Subject Progress</h2>
               <div className="mb-4">
                  <div className="flex justify-between text-sm">
                     <span>Mathematics</span>
                     <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
                  </div>

                  <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
                  <ul className="text-sm list-disc ml-5 text-gray-600">
                     <li>Complex Integration</li>
                     <li>Differential Equations</li>
                  </ul>

                  <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
                  <ul className="text-sm list-disc ml-5 text-blue-500">
                     <li>Khan Academy - Calculus</li>
                     <li>MIT OpenCourseWare - Advanced Math</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default StudentDashboard;