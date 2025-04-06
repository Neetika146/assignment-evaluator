//  // //// src/components/Dashboard/StudentDashboard.jsx
//// //import React from "react";
//// //import { useNavigate } from "react-router-dom";
//// //import AssignmentCard from "./AssignmentCard";
//// //import { Line } from "react-chartjs-2";
//// //import './Dashboard.css';

//// ////import { Button } from "@/components/ui/Button";
//// //import MyChart from "./MyChart";
//// //import {
//// //   Chart as ChartJS,
//// //   CategoryScale,
//// //   LinearScale,
//// //   PointElement,
//// //   LineElement,
//// //   Title,
//// //   Tooltip,
//// //   Legend
//// //} from 'chart.js';

//// //ChartJS.register(
//// //   CategoryScale,
//// //   LinearScale,
//// //   PointElement,
//// //   LineElement,
//// //   Title,
//// //   Tooltip,
//// //   Legend
//// //);



//// //const StudentDashboard = () => {
//// //   return (
//// //      <div className="p-6">
//// //         {/* Header */}
//// //         <div className="flex justify-between items-center mb-4">
//// //            <div>
//// //               <h1 className="text-2xl font-bold">Student Dashboard</h1>
//// //               <p className="text-gray-500">Track your progress and assignments</p>
//// //            </div>
//// //            {/** yhan button tha */}
//// //         </div>

//// //         {/* Assignments Section */}
//// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//// //            {/* Assignment Card */}
//// //            <div className="bg-white p-4 rounded-lg shadow-md">
//// //               <div className="flex justify-between items-center">
//// //                  <div>
//// //                     <h2 className="font-semibold">Mathematics Assignment 1</h2>
//// //                     <p className="text-gray-400">Mathematics</p>
//// //                  </div>
//// //                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
//// //                     Completed
//// //                  </span>
//// //               </div>

//// //               <div className="mt-2">
//// //                  <p className="text-sm text-gray-600">Score</p>
//// //                  <div className="w-full bg-gray-200 rounded h-2">
//// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
//// //                  </div>
//// //                  <p className="text-sm text-gray-600 mt-1">85%</p>
//// //               </div>

//// //               <p className="text-sm mt-2">
//// //                  <span className="font-medium">Feedback:</span> Good understanding of calculus concepts
//// //               </p>
//// //               <p className="text-sm text-gray-400 mt-1">Due: 1/3/2024</p>
//// //            </div>

//// //            {/* Physics Lab Report */}
//// //            <div className="bg-white p-4 rounded-lg shadow-md">
//// //               <div className="flex justify-between items-center">
//// //                  <div>
//// //                     <h2 className="font-semibold">Physics Lab Report</h2>
//// //                     <p className="text-gray-400">Physics</p>
//// //                  </div>
//// //                  <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded">
//// //                     Needs Review
//// //                  </span>
//// //               </div>

//// //               <div className="mt-2">
//// //                  <p className="text-sm text-gray-600">Score</p>
//// //                  <div className="w-full bg-gray-200 rounded h-2">
//// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
//// //                  </div>
//// //                  <p className="text-sm text-gray-600 mt-1">72%</p>
//// //               </div>

//// //               <p className="text-sm mt-2">
//// //                  <span className="font-medium">Feedback:</span> Needs more detailed experimental analysis
//// //               </p>
//// //               <p className="text-sm text-gray-400 mt-1">Due: 5/3/2024</p>
//// //            </div>

//// //            {/* Chemistry Assignment */}
//// //            <div className="bg-white p-4 rounded-lg shadow-md">
//// //               <div className="flex justify-between items-center">
//// //                  <div>
//// //                     <h2 className="font-semibold">Chemistry Assignment 3</h2>
//// //                     <p className="text-gray-400">Chemistry</p>
//// //                  </div>
//// //                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
//// //                     Pending
//// //                  </span>
//// //               </div>

//// //               <p className="text-sm text-gray-400 mt-1">Due: 10/3/2024</p>
//// //            </div>
//// //         </div>

//// //         {/* Performance and Subject Progress Section */}
//// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//// //            {/* Performance Trend */}
//// //            <div className="bg-white p-4 rounded-lg shadow-md">
//// //               <h2 className="text-lg font-semibold mb-2">Performance Trend</h2>
//// //               <MyChart />
//// //            </div>

//// //            {/* Subject Progress */}
//// //            <div className="bg-white p-4 rounded-lg shadow-md">
//// //               <h2 className="text-lg font-semibold mb-2">Subject Progress</h2>

//// //               {/* Mathematics */}
//// //               <div className="mb-4">
//// //                  <div className="flex justify-between text-sm">
//// //                     <span>Mathematics</span>
//// //                     <span>85%</span>
//// //                  </div>
//// //                  <div className="w-full bg-gray-200 rounded h-2">
//// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "85%" }}></div>
//// //                  </div>

//// //                  <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
//// //                  <ul className="text-sm list-disc ml-5 text-gray-600">
//// //                     <li>Complex Integration</li>
//// //                     <li>Differential Equations</li>
//// //                  </ul>

//// //                  <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
//// //                  <ul className="text-sm list-disc ml-5 text-blue-500">
//// //                     <li>Khan Academy - Calculus</li>
//// //                     <li>MIT OpenCourseWare - Advanced Math</li>
//// //                  </ul>
//// //               </div>

//// //               {/* Physics */}
//// //               <div>
//// //                  <div className="flex justify-between text-sm">
//// //                     <span>Physics</span>
//// //                     <span>72%</span>
//// //                  </div>
//// //                  <div className="w-full bg-gray-200 rounded h-2">
//// //                     <div className="bg-blue-500 h-2 rounded" style={{ width: "72%" }}></div>
//// //                  </div>

//// //                  <p className="text-sm mt-2 font-semibold">Areas to Improve:</p>
//// //                  <ul className="text-sm list-disc ml-5 text-gray-600">
//// //                     <li>Quantum Mechanics</li>
//// //                     <li>Electromagnetism</li>
//// //                  </ul>

//// //                  <p className="text-sm mt-2 font-semibold">Recommended Resources:</p>
//// //                  <ul className="text-sm list-disc ml-5 text-blue-500">
//// //                     <li>Physics Lab Techniques</li>
//// //                     <li>Video: Understanding Wave Functions</li>
//// //                  </ul>
//// //               </div>
//// //            </div>
//// //         </div>
//// //      </div>
//// //   );
//// //};

////export default StudentDashboard;
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

//const StudentDashboard = () => {
//  const [assignments, setAssignments] = useState([]);
//  const [selectedReport, setSelectedReport] = useState(null);
//  const [error, setError] = useState("");
//  const navigate = useNavigate();

//  useEffect(() => {
//    axios.get('http://localhost:5000/assignments')
//      .then(response => {
//        const processedAssignments = response.data.map(assignment => {
//          let feedbackData = {};

//          try {
//            if (typeof assignment.feedback === 'string') {
//              feedbackData = JSON.parse(assignment.feedback);
//            } else if (typeof assignment.feedback === 'object') {
//              feedbackData = assignment.feedback;
//            }
//          } catch (e) {
//            console.error("Error parsing feedback JSON:", e);
//          }

//          return {
//            ...assignment,
//            parsedFeedback: feedbackData
//          };
//        });

//        setAssignments(processedAssignments);
//      })
//      .catch(err => {
//        console.error('Error fetching assignments:', err);
//        setError("Failed to load assignments");
//      });
//  }, []);

//  const viewReport = async (filename) => {
//    try {
//      const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
//      if (response.data && response.data.report) {
//        setSelectedReport(JSON.stringify(response.data.report, null, 2));
//      } else {
//        throw new Error("Report not found");
//      }
//    } catch (err) {
//      console.error("Error fetching report:", err);
//      setSelectedReport("No evaluation data found.");
//    }
//  };

//  // const downloadReport = (filename) => {
//  //   window.open(`http://localhost:5000/get_report/${filename}`, '_blank');
//  // };
//  // const downloadReport = (filename) => {
//  //   const link = document.createElement('a');
//  //   link.href = `http://localhost:5000/download_report/${filename}`;
//  //   link.setAttribute('download', filename);
//  //   document.body.appendChild(link);
//  //   link.click();
//  //   document.body.removeChild(link);
//  // };
  
//  // const downloadReport = async (filename) => {
//  //   try {
//  //     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
  
//  //     if (!response.data || !response.data.report) {
//  //       throw new Error("Report not found");
//  //     }
  
//  //     const report = response.data.report;
      
//  //     autoTable(jsPDF);

//  //     const doc = new jsPDF();
  
//  //     doc.setFontSize(18);
//  //     doc.text("Evaluation Report", 14, 20);
  
//  //     const tableData = Object.entries(report).map(([key, value]) => {
//  //       const formattedValue = Array.isArray(value)
//  //         ? value.join(', ')
//  //         : value;
//  //       return [key.replace(/_/g, ' '), formattedValue];
//  //     });
  
//  //     doc.autoTable({
//  //       startY: 30,
//  //       head: [['Field', 'Value']],
//  //       body: tableData,
//  //       styles: { fontSize: 10 },
//  //       headStyles: { fillColor: [22, 160, 133] },
//  //     });
  
//  //     doc.save(`${filename}_evaluation.pdf`);
//  //   }
//  //   catch (err) {
//  //     console.error("Error generating PDF:", err);
//  //     alert(`Failed to generate PDF report: ${err.message}`);
//  //   }
    
//  // };

//// const downloadReport = async (filename) => {
////   try {
////     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

////     if (!response.data || !response.data.report) {
////       throw new Error("Report not found");
////     }

////     const report = response.data.report;
////     const doc = new jsPDF();

////     doc.setFontSize(16);
////     doc.text("Evaluation Report", 14, 20);

////     let y = 30;

////     Object.entries(report).forEach(([key, value]) => {
////       const label = key.replace(/_/g, ' ');
////       const formattedValue = Array.isArray(value) ? value.join(', ') : value;

////       doc.setFontSize(12);
////       doc.text(`${label}:`, 14, y);
////       doc.setFont("helvetica", "normal");
////       doc.text(String(formattedValue), 60, y);
////       y += 10;

////       if (y > 270) {
////         doc.addPage();
////         y = 20;
////       }
////     });

////     doc.save(`${filename}_evaluation.pdf`);
////   } catch (err) {
////     console.error("Error generating PDF:", err);
////     alert(`Failed to generate PDF report: ${err.message}`);
////   }
//// };
//const downloadReport = async (filename) => {
//  try {
//    const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

//    if (!response.data || !response.data.report) {
//      throw new Error("Report not found");
//    }

//    const report = response.data.report;
//    const doc = new jsPDF();
//    const assignment = assignments.find(a => a.filename === filename);

//    // Title and metadata
//    doc.setFontSize(20);
//    doc.setTextColor(44, 62, 80);
//    doc.text("Assignment Evaluation Report", 15, 20);

//    if (assignment) {
//      doc.setFontSize(14);
//      doc.text(`${assignment.title || 'Untitled Assignment'}`, 15, 30);
//      doc.setFontSize(12);
//      doc.text(`Subject: ${assignment.subject || 'N/A'}`, 15, 38);
//      doc.text(`Date: ${assignment.date_processed || 'N/A'}`, 15, 46);
//    }

//    // Grade Section
//    doc.setFillColor(52, 152, 219);
//    doc.rect(15, 55, 180, 12, 'F');
//    doc.setTextColor(255, 255, 255);
//    doc.setFontSize(12);
//    doc.text("GRADE", 20, 63);
//    doc.text(`${report.grade || 'N/A'}`, 170, 63, { align: 'right' });

//    // Content Section Setup
//    let yPos = 75;
//    const addSection = (title, textOrArray) => {
//      if (!textOrArray || (Array.isArray(textOrArray) && textOrArray.length === 0)) return;
//      if (yPos > 230) {
//        doc.addPage();
//        yPos = 20;
//      }
//      doc.setTextColor(44, 62, 80);
//      doc.setFontSize(14);
//      doc.text(title, 15, yPos);
//      yPos += 8;
//      doc.setFontSize(11);

//      if (Array.isArray(textOrArray)) {
//        textOrArray.forEach(item => {
//          const bullet = `• ${item.replace(/<[^>]*>/g, '')}`;
//          const lines = doc.splitTextToSize(bullet, 180);
//          doc.text(lines, 15, yPos);
//          yPos += lines.length * 6 + 2;
//          if (yPos > 270) {
//            doc.addPage();
//            yPos = 20;
//          }
//        });
//      } else {
//        const lines = doc.splitTextToSize(textOrArray, 180);
//        doc.text(lines, 15, yPos);
//        yPos += lines.length * 6 + 10;
//      }
//    };
//    addSection("Student Name", report.student_name);
//    addSection("Roll No.-", report.roll_no);
//    addSection("Summary", report.summary);
//    addSection("Strengths", report.strengths);
//    addSection("Areas for Improvement", report.areas_for_improvement);
//    addSection("Specific Feedback", report.specific_feedback);
//    addSection("Personalized Learning Plan", report.personalized_learning_plan);

//    // Footer
//    const totalPages = doc.internal.getNumberOfPages();
//    for (let i = 1; i <= totalPages; i++) {
//      doc.setPage(i);
//      doc.setFontSize(10);
//      doc.setTextColor(150, 150, 150);
//      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 285);
//      doc.text(`Page ${i} of ${totalPages}`, 200 - 15, 285, { align: 'right' });
//    }

//    doc.save(`${filename}_evaluation.pdf`);
//  } catch (err) {
//    console.error("Error generating PDF:", err);
//    setError(`Failed to generate PDF report: ${err.message}`);
//  }
//};



//  return (
//    <div className="p-6">
//      <div className="flex justify-between items-center mb-6">
//        <h1 className="text-3xl font-bold">📚 Student Dashboard</h1>
//        <button
//          onClick={() => navigate('/upload-assignment-type')}
//          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
//        >
//          Upload Assignment
//        </button>
//      </div>

//      {error && (
//        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded mb-4">
//          {error}
//        </div>
//      )}

//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//        {assignments.map((assignment) => {
//          const feedback = assignment.parsedFeedback || {};

//          return (
//            <div key={assignment.id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
//              <h2 className="text-xl font-semibold">{assignment.title}</h2>
//              <p className="text-sm text-gray-600">📅 {assignment.date_processed}</p>
//              <p className="text-sm mt-1">Subject: <span className="font-medium">{assignment.subject}</span></p>

//              <p className="text-sm mt-1">
//                Grade:{" "}
//                <span className={`font-bold text-lg ${
//                  (feedback.grade ?? assignment.grade ?? 0) >= 75
//                    ? 'text-green-600'
//                    : (feedback.grade ?? assignment.grade ?? 0) >= 60
//                    ? 'text-yellow-600'
//                    : 'text-red-600'
//                }`}>
//                  {feedback.grade ?? assignment.grade ?? 'N/A'}
//                </span>
//              </p>


//              {feedback.summary && (
//                <div className="mt-3">
//                  <p className="text-sm font-medium">Summary:</p>
//                  <p className="text-sm text-gray-700">{feedback.summary}</p>
//                </div>
//              )}

//              {feedback.strengths?.length > 0 && (
//                <div className="mt-2">
//                  <p className="text-sm font-medium">Strengths:</p>
//                  <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
//                    {feedback.strengths.slice(0, 2).map((strength, idx) => (
//                      <li key={idx}>{strength}</li>
//                    ))}
//                    {feedback.strengths.length > 2 && (
//                      <p
//                        className="text-xs text-blue-600 cursor-pointer ml-2"
//                        onClick={() => viewReport(assignment.filename)}
//                      >
//                        + {feedback.strengths.length - 2} more strengths...
//                      </p>
//                    )}
//                  </ul>
//                </div>
//              )}

//              {feedback.areas_for_improvement?.length > 0 && (
//                <div className="mt-2">
//                  <p className="text-sm font-medium">Areas for Improvement:</p>
//                  <p className="text-sm text-gray-700 italic">
//                    {feedback.areas_for_improvement[0].slice(0, 60)}...
//                  </p>
//                  {feedback.areas_for_improvement.length > 1 && (
//                    <p
//                      className="text-xs text-blue-600 cursor-pointer"
//                      onClick={() => viewReport(assignment.filename)}
//                    >
//                      + {feedback.areas_for_improvement.length - 1} more items...
//                    </p>
//                  )}
//                </div>
//              )}

//              <div className="mt-4 flex gap-3">
//                <button
//                  onClick={() => viewReport(assignment.filename)}
//                  className="bg-blue-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-700"
//                >
//                  View Report
//                </button>
//                <button
//                  onClick={() => downloadReport(assignment.filename)}
//                  className="bg-green-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-green-700"
//                >
//                  Download
//                </button>
//              </div>
//            </div>
//          );
//        })}
//      </div>

//      {selectedReport && (
//        <div className="mt-8 bg-gray-100 p-4 rounded-xl border">
//          <div className="flex justify-between items-center mb-2">
//            <h3 className="text-xl font-semibold">📄 Evaluation Report</h3>
//            <button
//              onClick={() => setSelectedReport(null)}
//              className="text-gray-500 hover:text-gray-700"
//            >
//              ✕ Close
//            </button>
//          </div>
//          <div className="overflow-x-auto">
//          <table className="min-w-full text-sm text-left text-gray-700">
//            <tbody>
//              {Object.entries(JSON.parse(selectedReport)).map(([key, value]) => (
//                <tr key={key} className="border-b border-gray-200">
//                  <td className="py-2 pr-4 font-medium capitalize">{key.replace(/_/g, " ")}</td>
//                  <td className="py-2">
//                    {Array.isArray(value)
//                      ? value.map((item, idx) => <li key={idx}>{item}</li>)
//                      : value}
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//        </div>

//        </div>
//      )}
//    </div>
//  );
//};

//export default StudentDashboard;
//// import jsPDF from 'jspdf';
//// import 'jspdf-autotable';
//// import React, { useEffect, useState } from 'react';
//// import axios from 'axios';
//// import { useNavigate } from 'react-router-dom';

//// const StudentDashboard = () => {
////   const [assignments, setAssignments] = useState([]);
////   const [selectedReport, setSelectedReport] = useState(null);
////   const [isModalOpen, setIsModalOpen] = useState(false);
////   const [error, setError] = useState("");
////   const [loading, setLoading] = useState(true);
////   const navigate = useNavigate();

////   useEffect(() => {
////     setLoading(true);
////     axios.get('http://localhost:5000/assignments')
////       .then(response => {
////         const processedAssignments = response.data.map(assignment => {
////           let feedbackData = {};

////           try {
////             if (typeof assignment.feedback === 'string') {
////               feedbackData = JSON.parse(assignment.feedback);
////             } else if (typeof assignment.feedback === 'object') {
////               feedbackData = assignment.feedback;
////             }
////           } catch (e) {
////             console.error("Error parsing feedback JSON:", e);
////           }

////           return {
////             ...assignment,
////             parsedFeedback: feedbackData
////           };
////         });

////         setAssignments(processedAssignments);
////         setLoading(false);
////       })
////       .catch(err => {
////         console.error('Error fetching assignments:', err);
////         setError("Failed to load assignments");
////         setLoading(false);
////       });
////   }, []);

////   const viewReport = async (filename) => {
////     try {
////       setLoading(true);
////       const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
////       if (response.data && response.data.report) {
////         setSelectedReport(response.data.report);
////         setIsModalOpen(true);
////       } else {
////         throw new Error("Report not found");
////       }
////     } catch (err) {
////       console.error("Error fetching report:", err);
////       setError(`Failed to load report: ${err.message}`);
////     } finally {
////       setLoading(false);
////     }
////   };
  
  
  
////   const closeModal = () => {
////     setIsModalOpen(false);
////     setSelectedReport(null);
////   };

////   return (
////     <div className="p-6 bg-gray-50 min-h-screen">
////       <div className="flex justify-between items-center mb-6">
////         <h1 className="text-3xl font-bold text-gray-800">📚 Student Dashboard</h1>
////         <button
////           onClick={() => navigate('/upload-assignment-type')}
////           className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition-colors"
////         >
////           + Upload Assignment
////         </button>
////       </div>

////       {error && (
////         <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg mb-6 flex items-center">
////           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
////             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
////           </svg>
////           {error}
////         </div>
////       )}
      
////       {loading && (
////         <div className="flex justify-center items-center py-12">
////           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
////         </div>
////       )}

////       {!loading && assignments.length === 0 && (
////         <div className="bg-white rounded-xl shadow-md p-12 text-center">
////           <p className="text-xl text-gray-600">No assignments found.</p>
////           <p className="text-gray-500 mt-2">Upload your first assignment to get started.</p>
////         </div>
////       )}

////       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
////         {assignments.map((assignment) => {
////           const feedback = assignment.parsedFeedback || {};

////           return (
////             <div key={assignment.id} className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
////               <h2 className="text-xl font-semibold text-gray-800">{assignment.title}</h2>
////               <p className="text-sm text-gray-600">📅 {assignment.date_processed}</p>
////               <p className="text-sm mt-2">Subject: <span className="font-medium">{assignment.subject}</span></p>

////               <div className="mt-3 flex items-center">
////                 <p className="text-sm">Grade:</p>
////                 <span className="ml-2 font-bold text-lg px-2 py-1 bg-blue-50 text-blue-800 rounded">
////                   {feedback.grade || assignment.grade || 'N/A'}
////                 </span>
////               </div>

////               {feedback.summary && (
////                 <div className="mt-4">
////                   <p className="text-sm font-medium text-gray-700">Summary:</p>
////                   <p className="text-sm text-gray-600 mt-1 line-clamp-3">{feedback.summary}</p>
////                 </div>
////               )}

////               {feedback.strengths?.length > 0 && (
////                 <div className="mt-3">
////                   <p className="text-sm font-medium text-gray-700">Strengths:</p>
////                   <ul className="list-disc list-inside text-sm text-gray-600 mt-1 ml-1">
////                     {feedback.strengths.slice(0, 2).map((strength, idx) => (
////                       <li key={idx} className="line-clamp-1">{strength}</li>
////                     ))}
////                     {feedback.strengths.length > 2 && (
////                       <p
////                         className="text-xs text-blue-600 cursor-pointer mt-1 hover:text-blue-800"
////                         onClick={() => viewReport(assignment.filename)}
////                       >
////                         + {feedback.strengths.length - 2} more strengths...
////                       </p>
////                     )}
////                   </ul>
////                 </div>
////               )}

////               {feedback.areas_for_improvement?.length > 0 && (
////                 <div className="mt-3">
////                   <p className="text-sm font-medium text-gray-700">Areas for Improvement:</p>
////                   <p className="text-sm text-gray-600 mt-1 italic line-clamp-1">
////                     {feedback.areas_for_improvement[0]}
////                   </p>
////                   {feedback.areas_for_improvement.length > 1 && (
////                     <p
////                       className="text-xs text-blue-600 cursor-pointer mt-1 hover:text-blue-800"
////                       onClick={() => viewReport(assignment.filename)}
////                     >
////                       + {feedback.areas_for_improvement.length - 1} more items...
////                     </p>
////                   )}
////                 </div>
////               )}

////               <div className="mt-5 flex gap-3">
////                 <button
////                   onClick={() => viewReport(assignment.filename)}
////                   className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
////                 >
////                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
////                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
////                   </svg>
////                   View
////                 </button>
////                 <button
////                   onClick={() => downloadReport(assignment.filename)}
////                   className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center"
////                   disabled={loading}
////                 >
////                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
////                   </svg>
////                   PDF
////                 </button>
////               </div>
////             </div>
////           );
////         })}
////       </div>

////       {/* Modal for viewing report */}
////       {isModalOpen && selectedReport && (
////         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
////           <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-90vh overflow-y-auto m-4">
////             <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
////               <h3 className="text-xl font-semibold">📄 Evaluation Report</h3>
////               <button
////                 onClick={closeModal}
////                 className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
////               >
////                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
////                 </svg>
////               </button>
////             </div>
            
////             <div className="p-5">
////               <div className="mb-5 bg-blue-50 p-4 rounded-lg flex justify-between items-center">
////                 <div>
////                   <p className="text-sm text-blue-700">Grade</p>
////                   <p className="text-3xl font-bold text-blue-800">{selectedReport.grade || 'N/A'}</p>
////                 </div>
////                 <button 
////                   onClick={() => {
////                     const selectedAssignment = assignments.find(a => a.parsedFeedback?.grade === selectedReport.grade);
////                     if (selectedAssignment) {
////                       downloadReport(selectedAssignment.filename);
////                     }
////                   }}
////                   className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
////                 >
////                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
////                   </svg>
////                   Download PDF
////                 </button>
////               </div>
              
////               {selectedReport.summary && (
////                 <div className="mb-6">
////                   <h4 className="text-lg font-semibold mb-2">Summary</h4>
////                   <p className="text-gray-700">{selectedReport.summary}</p>
////                 </div>
////               )}
              
////               {selectedReport.strengths && selectedReport.strengths.length > 0 && (
////                 <div className="mb-6">
////                   <h4 className="text-lg font-semibold mb-2">Strengths</h4>
////                   <ul className="list-disc list-inside text-gray-700 space-y-2">
////                     {selectedReport.strengths.map((strength, idx) => (
////                       <li key={idx}>{strength}</li>
////                     ))}
////                   </ul>
////                 </div>
////               )}
              
////               {selectedReport.areas_for_improvement && selectedReport.areas_for_improvement.length > 0 && (
////                 <div className="mb-6">
////                   <h4 className="text-lg font-semibold mb-2">Areas for Improvement</h4>
////                   <ul className="list-disc list-inside text-gray-700 space-y-2">
////                     {selectedReport.areas_for_improvement.map((area, idx) => (
////                       <li key={idx}>{area}</li>
////                     ))}
////                   </ul>
////                 </div>
////               )}
              
////               {selectedReport.specific_feedback && (
////                 <div className="mb-6">
////                   <h4 className="text-lg font-semibold mb-2">Specific Feedback</h4>
////                   <p className="text-gray-700">{selectedReport.specific_feedback}</p>
////                 </div>
////               )}
              
////               {selectedReport.personalized_learning_plan && selectedReport.personalized_learning_plan.length > 0 && (
////                 <div>
////                   <h4 className="text-lg font-semibold mb-2">Personalized Learning Plan</h4>
////                   <ul className="list-disc list-inside text-gray-700 space-y-3">
////                     {selectedReport.personalized_learning_plan.map((item, idx) => (
////                       <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
////                     ))}
////                   </ul>
////                 </div>
////               )}
////             </div>
            
////             <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
////               <button
////                 onClick={closeModal}
////                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
////               >
////                 Close
////               </button>
////             </div>
////           </div>
////         </div>
////       )}
////     </div>
////   );
//// };

//// export default StudentDashboard;

//export default StudentDashboard;
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/assignments')
//       .then(response => {
//         const processedAssignments = response.data.map(assignment => {
//           let feedbackData = {};

//           try {
//             if (typeof assignment.feedback === 'string') {
//               feedbackData = JSON.parse(assignment.feedback);
//             } else if (typeof assignment.feedback === 'object') {
//               feedbackData = assignment.feedback;
//             }
//           } catch (e) {
//             console.error("Error parsing feedback JSON:", e);
//           }

//           return {
//             ...assignment,
//             parsedFeedback: feedbackData
//           };
//         });

//         setAssignments(processedAssignments);
//       })
//       .catch(err => {
//         console.error('Error fetching assignments:', err);
//         setError("Failed to load assignments");
//       });
//   }, []);

//   const viewReport = async (filename) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
//       if (response.data && response.data.report) {
//         setSelectedReport(JSON.stringify(response.data.report, null, 2));
//       } else {
//         throw new Error("Report not found");
//       }
//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setSelectedReport("No evaluation data found.");
//     }
//   };

//   // const downloadReport = (filename) => {
//   //   window.open(`http://localhost:5000/get_report/${filename}`, '_blank');
//   // };
//   // const downloadReport = (filename) => {
//   //   const link = document.createElement('a');
//   //   link.href = `http://localhost:5000/download_report/${filename}`;
//   //   link.setAttribute('download', filename);
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };
  
//   // const downloadReport = async (filename) => {
//   //   try {
//   //     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
  
//   //     if (!response.data || !response.data.report) {
//   //       throw new Error("Report not found");
//   //     }
  
//   //     const report = response.data.report;
      
//   //     autoTable(jsPDF);

//   //     const doc = new jsPDF();
  
//   //     doc.setFontSize(18);
//   //     doc.text("Evaluation Report", 14, 20);
  
//   //     const tableData = Object.entries(report).map(([key, value]) => {
//   //       const formattedValue = Array.isArray(value)
//   //         ? value.join(', ')
//   //         : value;
//   //       return [key.replace(/_/g, ' '), formattedValue];
//   //     });
  
//   //     doc.autoTable({
//   //       startY: 30,
//   //       head: [['Field', 'Value']],
//   //       body: tableData,
//   //       styles: { fontSize: 10 },
//   //       headStyles: { fillColor: [22, 160, 133] },
//   //     });
  
//   //     doc.save(`${filename}_evaluation.pdf`);
//   //   }
//   //   catch (err) {
//   //     console.error("Error generating PDF:", err);
//   //     alert(`Failed to generate PDF report: ${err.message}`);
//   //   }
    
//   // };

// // const downloadReport = async (filename) => {
// //   try {
// //     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

// //     if (!response.data || !response.data.report) {
// //       throw new Error("Report not found");
// //     }

// //     const report = response.data.report;
// //     const doc = new jsPDF();

// //     doc.setFontSize(16);
// //     doc.text("Evaluation Report", 14, 20);

// //     let y = 30;

// //     Object.entries(report).forEach(([key, value]) => {
// //       const label = key.replace(/_/g, ' ');
// //       const formattedValue = Array.isArray(value) ? value.join(', ') : value;

// //       doc.setFontSize(12);
// //       doc.text(`${label}:`, 14, y);
// //       doc.setFont("helvetica", "normal");
// //       doc.text(String(formattedValue), 60, y);
// //       y += 10;

// //       if (y > 270) {
// //         doc.addPage();
// //         y = 20;
// //       }
// //     });

// //     doc.save(`${filename}_evaluation.pdf`);
// //   } catch (err) {
// //     console.error("Error generating PDF:", err);
// //     alert(`Failed to generate PDF report: ${err.message}`);
// //   }
// // };
// const downloadReport = async (filename) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

//     if (!response.data || !response.data.report) {
//       throw new Error("Report not found");
//     }

//     const report = response.data.report;
//     const doc = new jsPDF();
//     const assignment = assignments.find(a => a.filename === filename);

//     // Title and metadata
//     doc.setFontSize(20);
//     doc.setTextColor(44, 62, 80);
//     doc.text("Assignment Evaluation Report", 15, 20);

//     if (assignment) {
//       doc.setFontSize(14);
//       doc.text(`${assignment.title || 'Untitled Assignment'}`, 15, 30);
//       doc.setFontSize(12);
//       doc.text(`Subject: ${assignment.subject || 'N/A'}`, 15, 38);
//       doc.text(`Date: ${assignment.date_processed || 'N/A'}`, 15, 46);
//     }

//     // Grade Section
//     doc.setFillColor(52, 152, 219);
//     doc.rect(15, 55, 180, 12, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(12);
//     doc.text("GRADE", 20, 63);
//     doc.text(`${report.grade || 'N/A'}`, 170, 63, { align: 'right' });

//     // Content Section Setup
//     let yPos = 75;
//     const addSection = (title, textOrArray) => {
//       if (!textOrArray || (Array.isArray(textOrArray) && textOrArray.length === 0)) return;
//       if (yPos > 230) {
//         doc.addPage();
//         yPos = 20;
//       }
//       doc.setTextColor(44, 62, 80);
//       doc.setFontSize(14);
//       doc.text(title, 15, yPos);
//       yPos += 8;
//       doc.setFontSize(11);

//       if (Array.isArray(textOrArray)) {
//         textOrArray.forEach(item => {
//           const bullet = `• ${item.replace(/<[^>]*>/g, '')}`;
//           const lines = doc.splitTextToSize(bullet, 180);
//           doc.text(lines, 15, yPos);
//           yPos += lines.length * 6 + 2;
//           if (yPos > 270) {
//             doc.addPage();
//             yPos = 20;
//           }
//         });
//       } else {
//         const lines = doc.splitTextToSize(textOrArray, 180);
//         doc.text(lines, 15, yPos);
//         yPos += lines.length * 6 + 10;
//       }
//     };
//     addSection("Student Name", report.student_name);
//     addSection("Roll No.-", report.roll_no);
//     addSection("Summary", report.summary);
//     addSection("Strengths", report.strengths);
//     addSection("Areas for Improvement", report.areas_for_improvement);
//     addSection("Specific Feedback", report.specific_feedback);
//     addSection("Personalized Learning Plan", report.personalized_learning_plan);

//     // Footer
//     const totalPages = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= totalPages; i++) {
//       doc.setPage(i);
//       doc.setFontSize(10);
//       doc.setTextColor(150, 150, 150);
//       doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 285);
//       doc.text(`Page ${i} of ${totalPages}`, 200 - 15, 285, { align: 'right' });
//     }

//     doc.save(`${filename}_evaluation.pdf`);
//   } catch (err) {
//     console.error("Error generating PDF:", err);
//     setError(`Failed to generate PDF report: ${err.message}`);
//   }
// };



//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">📚 Student Dashboard</h1>
//         <button
//           onClick={() => navigate('/upload-assignment-type')}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
//         >
//           Upload Assignment
//         </button>
//       </div>

//       {error && (
//         <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {assignments.map((assignment) => {
//           const feedback = assignment.parsedFeedback || {};

//           return (
//             <div key={assignment.id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
//               <h2 className="text-xl font-semibold">{assignment.title}</h2>
//               <p className="text-sm text-gray-600">📅 {assignment.date_processed}</p>
//               <p className="text-sm mt-1">Subject: <span className="font-medium">{assignment.subject}</span></p>

              


//               {feedback.summary && (
//                 <div className="mt-3">
//                   <p className="text-sm font-medium">Summary:</p>
//                   <p className="text-sm text-gray-700">{feedback.summary}</p>
//                 </div>
//               )}

//               {feedback.strengths?.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-sm font-medium">Strengths:</p>
//                   <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
//                     {feedback.strengths.slice(0, 2).map((strength, idx) => (
//                       <li key={idx}>{strength}</li>
//                     ))}
//                     {feedback.strengths.length > 2 && (
//                       <p
//                         className="text-xs text-blue-600 cursor-pointer ml-2"
//                         onClick={() => viewReport(assignment.filename)}
//                       >
//                         + {feedback.strengths.length - 2} more strengths...
//                       </p>
//                     )}
//                   </ul>
//                 </div>
//               )}

//               {feedback.areas_for_improvement?.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-sm font-medium">Areas for Improvement:</p>
//                   <p className="text-sm text-gray-700 italic">
//                     {feedback.areas_for_improvement[0].slice(0, 60)}...
//                   </p>
//                   {feedback.areas_for_improvement.length > 1 && (
//                     <p
//                       className="text-xs text-blue-600 cursor-pointer"
//                       onClick={() => viewReport(assignment.filename)}
//                     >
//                       + {feedback.areas_for_improvement.length - 1} more items...
//                     </p>
//                   )}
//                 </div>
//               )}

//               <div className="mt-4 flex gap-3">
//                 <button
//                   onClick={() => viewReport(assignment.filename)}
//                   className="bg-blue-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-700"
//                 >
//                   View Report
//                 </button>
//                 <button
//                   onClick={() => downloadReport(assignment.filename)}
//                   className="bg-green-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-green-700"
//                 >
//                   Download
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {selectedReport && (
//         <div className="mt-8 bg-gray-100 p-4 rounded-xl border">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-xl font-semibold">📄 Evaluation Report</h3>
//             <button
//               onClick={() => setSelectedReport(null)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ✕ Close
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <tbody>
//               {Object.entries(JSON.parse(selectedReport)).map(([key, value]) => (
//                 <tr key={key} className="border-b border-gray-200">
//                   <td className="py-2 pr-4 font-medium capitalize">{key.replace(/_/g, " ")}</td>
//                   <td className="py-2">
//                     {Array.isArray(value)
//                       ? value.map((item, idx) => <li key={idx}>{item}</li>)
//                       : value}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;
//export default StudentDashboard;
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/assignments')
      .then(response => {
        const processedAssignments = response.data.map(assignment => {
          let feedbackData = {};

          try {
            if (typeof assignment.feedback === 'string') {
              feedbackData = JSON.parse(assignment.feedback);
            } else if (typeof assignment.feedback === 'object') {
              feedbackData = assignment.feedback;
            }
          } catch (e) {
            console.error("Error parsing feedback JSON:", e);
          }

          return {
            ...assignment,
            parsedFeedback: feedbackData
          };
        });

        setAssignments(processedAssignments);
      })
      .catch(err => {
        console.error('Error fetching assignments:', err);
        setError("Failed to load assignments");
      });
  }, []);

  const viewReport = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
      if (response.data && response.data.report) {
        setSelectedReport(JSON.stringify(response.data.report, null, 2));
      } else {
        throw new Error("Report not found");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setSelectedReport("No evaluation data found.");
    }
  };

  // const downloadReport = (filename) => {
  //   window.open(`http://localhost:5000/get_report/${filename}`, '_blank');
  // };
  // const downloadReport = (filename) => {
  //   const link = document.createElement('a');
  //   link.href = `http://localhost:5000/download_report/${filename}`;
  //   link.setAttribute('download', filename);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  
  // const downloadReport = async (filename) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);
  
  //     if (!response.data || !response.data.report) {
  //       throw new Error("Report not found");
  //     }
  
  //     const report = response.data.report;
      
  //     autoTable(jsPDF);

  //     const doc = new jsPDF();
  
  //     doc.setFontSize(18);
  //     doc.text("Evaluation Report", 14, 20);
  
  //     const tableData = Object.entries(report).map(([key, value]) => {
  //       const formattedValue = Array.isArray(value)
  //         ? value.join(', ')
  //         : value;
  //       return [key.replace(/_/g, ' '), formattedValue];
  //     });
  
  //     doc.autoTable({
  //       startY: 30,
  //       head: [['Field', 'Value']],
  //       body: tableData,
  //       styles: { fontSize: 10 },
  //       headStyles: { fillColor: [22, 160, 133] },
  //     });
  
  //     doc.save(`${filename}_evaluation.pdf`);
  //   }
  //   catch (err) {
  //     console.error("Error generating PDF:", err);
  //     alert(`Failed to generate PDF report: ${err.message}`);
  //   }
    
  // };

// const downloadReport = async (filename) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

//     if (!response.data || !response.data.report) {
//       throw new Error("Report not found");
//     }

//     const report = response.data.report;
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text("Evaluation Report", 14, 20);

//     let y = 30;

//     Object.entries(report).forEach(([key, value]) => {
//       const label = key.replace(/_/g, ' ');
//       const formattedValue = Array.isArray(value) ? value.join(', ') : value;

//       doc.setFontSize(12);
//       doc.text(`${label}:`, 14, y);
//       doc.setFont("helvetica", "normal");
//       doc.text(String(formattedValue), 60, y);
//       y += 10;

//       if (y > 270) {
//         doc.addPage();
//         y = 20;
//       }
//     });

//     doc.save(`${filename}_evaluation.pdf`);
//   } catch (err) {
//     console.error("Error generating PDF:", err);
//     alert(`Failed to generate PDF report: ${err.message}`);
//   }
// };
const downloadReport = async (filename) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_report/${filename}`);

    if (!response.data || !response.data.report) {
      throw new Error("Report not found");
    }

    const report = response.data.report;
    const doc = new jsPDF();
    const assignment = assignments.find(a => a.filename === filename);

    // Title and metadata
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text("Assignment Evaluation Report", 15, 20);

    if (assignment) {
      doc.setFontSize(14);
      doc.text(`${assignment.title || 'Untitled Assignment'}`, 15, 30);
      doc.setFontSize(12);
      doc.text(`Subject: ${assignment.subject || 'N/A'}`, 15, 38);
      doc.text(`Date: ${assignment.date_processed || 'N/A'}`, 15, 46);
    }

    // Grade Section
    doc.setFillColor(52, 152, 219);
    doc.rect(15, 55, 180, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("GRADE", 20, 63);
    doc.text(`${report.grade || 'N/A'}`, 170, 63, { align: 'right' });

    // Content Section Setup
    let yPos = 75;
    const addSection = (title, textOrArray) => {
      if (!textOrArray || (Array.isArray(textOrArray) && textOrArray.length === 0)) return;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      doc.setTextColor(44, 62, 80);
      doc.setFontSize(14);
      doc.text(title, 15, yPos);
      yPos += 8;
      doc.setFontSize(11);

      if (Array.isArray(textOrArray)) {
        textOrArray.forEach(item => {
          const bullet = `• ${item.replace(/<[^>]*>/g, '')}`;
          const lines = doc.splitTextToSize(bullet, 180);
          doc.text(lines, 15, yPos);
          yPos += lines.length * 6 + 2;
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });
      } else {
        const lines = doc.splitTextToSize(textOrArray, 180);
        doc.text(lines, 15, yPos);
        yPos += lines.length * 6 + 10;
      }
    };
    addSection("Student Name", report.student_name);
    addSection("Roll No.-", report.roll_no);
    addSection("Summary", report.summary);
    addSection("Strengths", report.strengths);
    addSection("Areas for Improvement", report.areas_for_improvement);
    addSection("Specific Feedback", report.specific_feedback);
    addSection("Personalized Learning Plan", report.personalized_learning_plan);

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 285);
      doc.text(`Page ${i} of ${totalPages}`, 200 - 15, 285, { align: 'right' });
    }

    doc.save(`${filename}_evaluation.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
    setError(`Failed to generate PDF report: ${err.message}`);
  }
};



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Student Dashboard</h1>
        <button
          onClick={() => navigate('/upload-assignment-type')}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          Upload Assignment
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((assignment) => {
          const feedback = assignment.parsedFeedback || {};

          return (
            <div key={assignment.id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
              <h2 className="text-xl font-semibold">{assignment.title}</h2>
              <p className="text-sm text-gray-600">📅 {assignment.date_processed}</p>
              <p className="text-sm mt-1">Subject: <span className="font-medium">{assignment.subject}</span></p>

              <p className="text-sm mt-1">
                Grade: <span className="font-bold text-lg">{feedback.grade || assignment.grade || 'N/A'}</span>
              </p>

              {feedback.summary && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Summary:</p>
                  <p className="text-sm text-gray-700">{feedback.summary}</p>
                </div>
              )}

              {feedback.strengths?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Strengths:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                    {feedback.strengths.slice(0, 2).map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                    {feedback.strengths.length > 2 && (
                      <p
                        className="text-xs text-blue-600 cursor-pointer ml-2"
                        onClick={() => viewReport(assignment.filename)}
                      >
                        + {feedback.strengths.length - 2} more strengths...
                      </p>
                    )}
                  </ul>
                </div>
              )}

              {feedback.areas_for_improvement?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Areas for Improvement:</p>
                  <p className="text-sm text-gray-700 italic">
                    {feedback.areas_for_improvement[0].slice(0, 60)}...
                  </p>
                  {feedback.areas_for_improvement.length > 1 && (
                    <p
                      className="text-xs text-blue-600 cursor-pointer"
                      onClick={() => viewReport(assignment.filename)}
                    >
                      + {feedback.areas_for_improvement.length - 1} more items...
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => viewReport(assignment.filename)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-700"
                >
                  View Report
                </button>
                <button
                  onClick={() => downloadReport(assignment.filename)}
                  className="bg-green-600 text-white px-4 py-1 rounded-xl text-sm hover:bg-green-700"
                >
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedReport && (
        <div className="mt-8 bg-gray-100 p-4 rounded-xl border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">📄 Evaluation Report</h3>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕ Close
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <tbody>
              {Object.entries(JSON.parse(selectedReport)).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200">
                  <td className="py-2 pr-4 font-medium capitalize">{key.replace(/_/g, " ")}</td>
                  <td className="py-2">
                    {Array.isArray(value)
                      ? value.map((item, idx) => <li key={idx}>{item}</li>)
                      : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
      )}
    </div>
  );
};

export default StudentDashboard;