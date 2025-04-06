// import React, { useState } from 'react';
// import './TeacherDashboard.css';

// const TeacherDashboard = () => {
//    const [teacherScores, setTeacherScores] = useState({
//       johnDoe: 85, 
//       janeSmith: 92,
//       aliceJohnson: '',
//    });

//    const handleScoreChange = (student, value) => {
//       setTeacherScores(prev => ({
//          ...prev,
//          [student]: value,
//       }));
//    };

//    return (
//       <div className="teacher-dashboard">
//          <h2 className="dashboard-title">Teacher Dashboard</h2>
//          <p className="dashboard-subtitle">Review and grade student assignments</p>

//          {/* Assignment Reviews */}
//          <div className="assignment-reviews">
//             <h3>Assignment Reviews</h3>
//             <p>Review AI-graded assignments and provide feedback</p>
//             <table className="assignment-table">
//                <thead>
//                   <tr>
//                      <th>Student</th>
//                      <th>Assignment</th>
//                      <th>AI Score</th>
//                      <th>Teacher Score</th>
//                      <th>Status</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   <tr>
//                      <td>John Doe</td>
//                      <td>Essay 1</td>
//                      <td>80%</td>
//                      <td>
//                         <input
//                            type="number"
//                            value={teacherScores.johnDoe}
//                            onChange={(e) => handleScoreChange('johnDoe', e.target.value)}
//                         />
//                      </td>
//                      <td>✅</td>
//                   </tr>
//                   <tr>
//                      <td>Jane Smith</td>
//                      <td>Essay 1</td>
//                      <td>92%</td>
//                      <td>
//                         <input
//                            type="number"
//                            value={teacherScores.janeSmith}
//                            onChange={(e) => handleScoreChange('janeSmith', e.target.value)}
//                         />
//                      </td>
//                      <td>✅</td>
//                   </tr>
//                   <tr>
//                      <td>Alice Johnson</td>
//                      <td>Essay 1</td>
//                      <td>75%</td>
//                      <td>
//                         <button className="score-button">Score</button>
//                      </td>
//                      <td>❌</td>
//                   </tr>
//                </tbody>
//             </table>
//          </div>

//          {/* Bottom Section */}
//          <div className="bottom-section">
//             {/* Class Performance */}
//             <div className="class-performance">
//                <h3>Class Performance</h3>
//                <div className="performance-placeholder">
//                   Performance chart will be displayed here
//                </div>
//             </div>

//             {/* Recent AI Feedback */}
//             <div className="recent-feedback">
//                <h3>Recent AI Feedback</h3>
//                <div className="feedback-content">
//                   <strong>Common Areas for Improvement</strong>
//                   <ul>
//                      <li>Thesis statement clarity</li>
//                      <li>Supporting evidence usage</li>
//                      <li>Conclusion structure</li>
//                   </ul>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default TeacherDashboard;

//line graph
// import React, { useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import "./TeacherDashboard.css";

// const Teacher = () => {
//    const [teacherScores, setTeacherScores] = useState({
//       johnDoe: 85,
//       janeSmith: 92,
//       aliceJohnson: "",
//    });

//    const handleScoreChange = (student, value) => {
//       setTeacherScores((prev) => ({
//          ...prev,
//          [student]: value,
//       }));
//    };

//    // Sample class performance data
//    const performanceData = [
//       { week: "Week 1", avgScore: 78 },
//       { week: "Week 2", avgScore: 82 },
//       { week: "Week 3", avgScore: 85 },
//       { week: "Week 4", avgScore: 88 },
//    ];

//    return (
//       <div className="teacher-dashboard">
//          <h2 className="dashboard-title">Teacher Dashboard</h2>
//          <p className="dashboard-subtitle">Review and grade student assignments</p>

//          {/* Assignment Reviews */}
//          <div className="assignment-reviews">
//             <h3>Assignment Reviews</h3>
//             <p>Review AI-graded assignments and provide feedback</p>
//             <table className="assignment-table">
//                <thead>
//                   <tr>
//                      <th>Student</th>
//                      <th>Assignment</th>
//                      <th>AI Score</th>
//                      <th>Teacher Score</th>
//                      <th>Status</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   <tr>
//                      <td>John Doe</td>
//                      <td>Essay 1</td>
//                      <td>80%</td>
//                      <td>
//                         <input
//                            type="number"
//                            value={teacherScores.johnDoe}
//                            onChange={(e) => handleScoreChange("johnDoe", e.target.value)}
//                         />
//                      </td>
//                      <td>✅</td>
//                   </tr>
//                   <tr>
//                      <td>Jane Smith</td>
//                      <td>Essay 1</td>
//                      <td>92%</td>
//                      <td>
//                         <input
//                            type="number"
//                            value={teacherScores.janeSmith}
//                            onChange={(e) => handleScoreChange("janeSmith", e.target.value)}
//                         />
//                      </td>
//                      <td>✅</td>
//                   </tr>
//                   <tr>
//                      <td>Alice Johnson</td>
//                      <td>Essay 1</td>
//                      <td>75%</td>
//                      <td>
//                         <button className="score-button">Score</button>
//                      </td>
//                      <td>❌</td>
//                   </tr>
//                </tbody>
//             </table>
//          </div>

//          {/* Two-column layout for Performance Chart & AI Feedback */}
//          <div className="dashboard-grid">
//             {/* Class Performance Chart */}
//             <div className="dashboard-card">
//                <h3>Class Performance</h3>
//                <p>Performance chart will be displayed here</p>
//                <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={performanceData}>
//                      <CartesianGrid strokeDasharray="3 3" />
//                      <XAxis dataKey="week" />
//                      <YAxis domain={[75, 90]} />
//                      <Tooltip />
//                      <Legend />
//                      <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
//                   </LineChart>
//                </ResponsiveContainer>
//             </div>

//             {/* AI Feedback Section */}
//             <div className="dashboard-card">
//                <h3>Recent AI Feedback</h3>
//                <p>Common Areas for Improvement</p>
//                <ul className="feedback-list">
//                   <li>Thesis statement clarity</li>
//                   <li>Supporting evidence usage</li>
//                   <li>Conclusion structure</li>
//                </ul>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default Teacher;

//score button
// import React, { useState } from "react";
// import {
//    LineChart,
//    Line,
//    XAxis,
//    YAxis,
//    CartesianGrid,
//    Tooltip,
//    Legend,
//    ResponsiveContainer,
// } from "recharts";
// import "./TeacherDashboard.css";

// const TeacherDashboard = () => {
//    const [teacherScores, setTeacherScores] = useState({
//       johnDoe: 85,
//       janeSmith: 92,
//       aliceJohnson: "",
//    });

//    const handleScoreChange = (student, value) => {
//       setTeacherScores((prev) => ({
//          ...prev,
//          [student]: value ? Number(value) : "",
//       }));
//    };

//    const performanceData = [
//       { week: "Week 1", avgScore: 78 },
//       { week: "Week 2", avgScore: 82 },
//       { week: "Week 3", avgScore: 85 },
//       { week: "Week 4", avgScore: 88 },
//    ];

//    return (
//       <div className="teacher-dashboard">
//          <h2 className="dashboard-title">Teacher Dashboard</h2>
//          <p className="dashboard-subtitle">Review and grade student assignments</p>

//          {/* Assignment Reviews */}
//          <div className="assignment-reviews">
//             <h3>Assignment Reviews</h3>
//             <p>Review AI-graded assignments and provide feedback</p>
//             <table className="assignment-table">
//                <thead>
//                   <tr>
//                      <th>Student</th>
//                      <th>Assignment</th>
//                      <th>AI Score</th>
//                      <th>Teacher Score</th>
//                      <th>Status</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   {Object.entries(teacherScores).map(([student, score]) => (
//                      <tr key={student}>
//                         <td>{student.replace(/([A-Z])/g, " $1").trim()}</td>
//                         <td>Essay 1</td>
//                         <td>{score ? `${score - 5}%` : "N/A"}</td>
//                         <td>
//                            <input
//                               type="number"
//                               value={score}
//                               onChange={(e) => handleScoreChange(student, e.target.value)}
//                               className="score-input"
//                            />
//                         </td>
//                         <td>{score !== "" ? "✅" : "❌"}</td>
//                      </tr>
//                   ))}
//                </tbody>
//             </table>
//          </div>

//          {/* Two-column layout */}
//          <div className="dashboard-grid">
//             {/* Class Performance Chart */}
//             <div className="dashboard-card">
//                <h3>Class Performance</h3>
//                <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={performanceData}>
//                      <CartesianGrid strokeDasharray="3 3" />
//                      <XAxis dataKey="week" />
//                      <YAxis domain={[75, 90]} />
//                      <Tooltip />
//                      <Legend />
//                      <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
//                   </LineChart>
//                </ResponsiveContainer>
//             </div>

//             {/* AI Feedback Section */}
//             <div className="dashboard-card">
//                <h3>Recent AI Feedback</h3>
//                <ul className="feedback-list">
//                   <li>Thesis statement clarity</li>
//                   <li>Supporting evidence usage</li>
//                   <li>Conclusion structure</li>
//                </ul>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default TeacherDashboard;



// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";
// import "./TeacherDashboard.css";

// const TeacherDashboard = () => {
//   const [studentAssignments, setStudentAssignments] = useState([]);
//   const [selectedEvaluation, setSelectedEvaluation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [performanceData, setPerformanceData] = useState([]);

//   // useEffect(() => {
//   //   // Fetch assignment data
//   //   axios.get('http://localhost:5000/assignments')
//   //     .then(response => {
//   //       // Process the assignments data
//   //       const processedAssignments = response.data.map(assignment => {
//   //         let evaluationData = {};

//   //         try {
//   //           if (typeof assignment.evaluation === 'string') {
//   //             evaluationData = JSON.parse(assignment.evaluation);
//   //           } else if (typeof assignment.evaluation === 'object') {
//   //             evaluationData = assignment.evaluation;
//   //           }
//   //         } catch (e) {
//   //           console.error("Error parsing evaluation JSON:", e);
//   //         }

//   //         return {
//   //           ...assignment,
//   //           parsedEvaluation: evaluationData,
//   //           teacherScore: assignment.teacherScore || "",
//   //         };
//   //       });

//   //       setStudentAssignments(processedAssignments);
        
//   //       // Generate performance data based on assignments
//   //       if (processedAssignments.length > 0) {
//   //         const weeklyPerformance = calculateClassPerformance(processedAssignments);
//   //         setPerformanceData(weeklyPerformance);
//   //       }
        
//   //       setLoading(false);
//   //     })
//   //     .catch(err => {
//   //       console.error('Error fetching assignments:', err);
//   //       setError("Failed to load assignment data");
//   //       setLoading(false);
//   //     });
//   // }, []);
//   useEffect(() => {
//     // Fetch assignment data
//     axios.get('http://localhost:5000/assignments')
//       .then(response => {
//         // Process the assignments data
//         const processedAssignments = response.data.map(assignment => {
//           let evaluationData = {};

//           try {
//             if (typeof assignment.evaluation === 'string') {
//               evaluationData = JSON.parse(assignment.evaluation);
//             } else if (typeof assignment.evaluation === 'object') {
//               evaluationData = assignment.evaluation;
//             }
//           } catch (e) {
//             console.error("Error parsing evaluation JSON:", e);
//           }

//           // Extract grade and student name from evaluation data
//           const grade = evaluationData.grade || "";
//           const studentName = evaluationData.student_name || "";

//           return {
//             ...assignment,
//             parsedEvaluation: evaluationData,
//             teacherScore: assignment.teacherScore || "",
//             grade: grade, // Add grade field
//             studentName: studentName // Add student name field
//           };
//         });

//         setStudentAssignments(processedAssignments);
        
//         // Generate performance data based on assignments
//         if (processedAssignments.length > 0) {
//           const weeklyPerformance = calculateClassPerformance(processedAssignments);
//           setPerformanceData(weeklyPerformance);
//         }
        
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching assignments:', err);
//         setError("Failed to load assignment data");
//         setLoading(false);
//       });
//   }, []);
//   // Calculate class performance based on assignments
//   const calculateClassPerformance = (assignments) => {
//     // Group assignments by submission date (simplified for example)
//     const weeklyData = {
//       "Week 1": [],
//       "Week 2": [],
//       "Week 3": [],
//       "Week 4": []
//     };
    
//     // Assign each assignment to a week based on date 
//     // (this is simplified - you would adjust according to your actual data)
//     assignments.forEach(assignment => {
//       const grade = assignment.parsedEvaluation?.grade || 0;
      
//       // Example sorting logic - replace with your actual date-based logic
//       const assignmentDate = new Date(assignment.date_processed || Date.now());
//       const week = Math.min(4, Math.ceil((Date.now() - assignmentDate) / (7 * 24 * 60 * 60 * 1000)));
      
//       if (week >= 1 && week <= 4) {
//         weeklyData[`Week ${week}`].push(grade);
//       }
//     });
    
//     // Calculate average for each week
//     return Object.entries(weeklyData).map(([week, grades]) => ({
//       week,
//       avgScore: grades.length > 0 
//         ? Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length) 
//         : 0
//     }));
//   };

//   const viewEvaluation = (assignment) => {
//     setSelectedEvaluation(assignment);
//   };

//   const handleScoreChange = (assignmentId, value) => {
//     setStudentAssignments(prevAssignments => 
//       prevAssignments.map(assignment => 
//         assignment.id === assignmentId 
//           ? { ...assignment, teacherScore: value ? Number(value) : "" } 
//           : assignment
//       )
//     );
    
//     // Optionally send the updated score to your backend
//     // axios.post(`http://localhost:5000/update_teacher_score/${assignmentId}`, { teacherScore: value })
//     //   .then(response => console.log("Score updated"))
//     //   .catch(err => console.error("Error updating score:", err));
//   };

//   if (loading) return <div className="loading">Loading assignment data...</div>;
  
//   if (error) return (
//     <div className="error-message">
//       {error}
//       <button onClick={() => window.location.reload()}>Retry</button>
//     </div>
//   );

//   return (
//     <div className="teacher-dashboard">
//       <h2 className="dashboard-title">Teacher Dashboard</h2>
//       <p className="dashboard-subtitle">Review and grade student assignments</p>

//       {/* Assignment Reviews */}
//       <div className="assignment-reviews">
//         <h3>Assignment Reviews</h3>
//         <p>Review AI-graded assignments and provide feedback</p>
//         <table className="assignment-table">
//           <thead>
//             <tr>
//               <th>Student</th>
//               <th>Roll No</th>
//               <th>Assignment</th>
//               <th>Date</th>
//               <th>AI Score</th>
//               <th>Teacher Score</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentAssignments.map((assignment) => {
//               const evaluation = assignment.parsedEvaluation || {};
              
//               return (
//                 <tr key={assignment.id}>
//                   <td>{evaluation.student_name || "Unknown"}</td>
//                   <td>{evaluation.student_roll || "Unknown"}</td>
//                   <td>{assignment.title || "Untitled"}</td>
//                   <td>{assignment.date_processed || "N/A"}</td>
//                   <td>{evaluation.grade ? `${evaluation.grade}%` : "N/A"}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={assignment.teacherScore}
//                       onChange={(e) => handleScoreChange(assignment.id, e.target.value)}
//                       className="score-input"
//                       min="0"
//                       max="100"
//                     />
//                   </td>
//                   <td>
//                     <button 
//                       onClick={() => viewEvaluation(assignment)}
//                       className="view-button"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Two-column layout */}
//       <div className="dashboard-grid">
//         {/* Class Performance Chart */}
//         <div className="dashboard-card">
//           <h3>Class Performance</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="week" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Legend />
//               <Line 
//                 type="monotone" 
//                 dataKey="avgScore" 
//                 stroke="#3b82f6" 
//                 strokeWidth={2} 
//                 dot={{ r: 5 }} 
//                 name="Avg. Score"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* AI Feedback Section */}
//         <div className="dashboard-card">
//           <h3>Common Improvement Areas</h3>
//           <ul className="feedback-list">
//             {studentAssignments.length > 0 && 
//              studentAssignments[0].parsedEvaluation?.areas_for_improvement ? (
//               studentAssignments[0].parsedEvaluation.areas_for_improvement.map((area, index) => (
//                 <li key={index}>{area}</li>
//               ))
//             ) : (
//               <>
//                 <li>Thesis statement clarity</li>
//                 <li>Supporting evidence usage</li>
//                 <li>Conclusion structure</li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* Detailed Evaluation Modal */}
//       {selectedEvaluation && (
//         <div className="evaluation-modal">
//           <div className="evaluation-content">
//             <div className="modal-header">
//               <h3>Evaluation Details</h3>
//               <button 
//                 className="close-button"
//                 onClick={() => setSelectedEvaluation(null)}
//               >
//                 ✕
//               </button>
//             </div>
            
//             <div className="evaluation-details">
//               <h4>{selectedEvaluation.title || "Untitled Assignment"}</h4>
//               <p><strong>Student:</strong> {selectedEvaluation.parsedEvaluation?.student_name || "Unknown"}</p>
//               <p><strong>Roll No:</strong> {selectedEvaluation.parsedEvaluation?.student_roll || "Unknown"}</p>
//               <p><strong>Grade:</strong> {selectedEvaluation.parsedEvaluation?.grade || "N/A"}</p>
              
//               <div className="evaluation-section">
//                 <h5>Summary</h5>
//                 <p>{selectedEvaluation.parsedEvaluation?.summary || "No summary available."}</p>
//               </div>
              
//               <div className="evaluation-section">
//                 <h5>Strengths</h5>
//                 <ul>
//                   {selectedEvaluation.parsedEvaluation?.strengths?.map((strength, idx) => (
//                     <li key={idx}>{strength}</li>
//                   )) || <li>No strengths listed.</li>}
//                 </ul>
//               </div>
              
//               <div className="evaluation-section">
//                 <h5>Areas for Improvement</h5>
//                 <ul>
//                   {selectedEvaluation.parsedEvaluation?.areas_for_improvement?.map((area, idx) => (
//                     <li key={idx}>{area}</li>
//                   )) || <li>No improvement areas listed.</li>}
//                 </ul>
//               </div>
              
//               <div className="evaluation-section">
//                 <h5>Specific Feedback</h5>
//                 <p>{selectedEvaluation.parsedEvaluation?.specific_feedback || "No specific feedback available."}</p>
//               </div>
              
//               <div className="evaluation-section">
//                 <h5>Learning Plan</h5>
//                 <ul>
//                   {selectedEvaluation.parsedEvaluation?.personalized_learning_plan?.map((item, idx) => (
//                     <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
//                   )) || <li>No learning plan available.</li>}
//                 </ul>
//               </div>
              
//               <div className="teacher-feedback">
//                 <h5>Teacher Feedback</h5>
//                 <textarea 
//                   placeholder="Add your feedback here..."
//                   rows="4"
//                   className="feedback-textarea"
//                 ></textarea>
//                 <div className="button-group">
//                   <button className="save-button">Save Feedback</button>
//                   <button className="download-button">Download Report</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherDashboard;
// // import React, { useState, useEffect } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";
// // import axios from "axios";
// // import "./TeacherDashboard.css";

// // const TeacherDashboard = () => {
// //   const [studentAssignments, setStudentAssignments] = useState([]);
// //   const [selectedEvaluation, setSelectedEvaluation] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [performanceData, setPerformanceData] = useState([]);

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/assignments")
// //       .then(response => {
// //         const processedAssignments = response.data.map(assignment => {
// //           let evaluationData = {};

// //           try {
// //             if (typeof assignment.evaluation === "string") {
// //               evaluationData = JSON.parse(assignment.evaluation);
// //             } else if (typeof assignment.evaluation === "object") {
// //               evaluationData = assignment.evaluation;
// //             }
// //           } catch (e) {
// //             console.error("Error parsing evaluation JSON:", e);
// //           }

// //           const grade = evaluationData.grade || "";
// //           const studentName = assignment.student_name || evaluationData.student_name || "Unknown";
// //           const studentRoll = assignment.student_roll || evaluationData.student_roll || "Unknown";

// //           return {
// //             ...assignment,
// //             parsedEvaluation: evaluationData,
// //             teacherScore: assignment.teacherScore || "",
// //             grade,
// //             studentName,
// //             studentRoll,
// //           };
// //         });

// //         setStudentAssignments(processedAssignments);

// //         if (processedAssignments.length > 0) {
// //           const weeklyPerformance = calculateClassPerformance(processedAssignments);
// //           setPerformanceData(weeklyPerformance);
// //         }

// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         console.error("Error fetching assignments:", err);
// //         setError("Failed to load assignment data");
// //         setLoading(false);
// //       });
// //   }, []);

// //   const calculateClassPerformance = (assignments) => {
// //     const weeklyData = {
// //       "Week 1": [],
// //       "Week 2": [],
// //       "Week 3": [],
// //       "Week 4": []
// //     };

// //     assignments.forEach(assignment => {
// //       const grade = assignment.parsedEvaluation?.grade || 0;
// //       const assignmentDate = new Date(assignment.date_processed || Date.now());
// //       const week = Math.min(4, Math.ceil((Date.now() - assignmentDate) / (7 * 24 * 60 * 60 * 1000)));

// //       if (week >= 1 && week <= 4) {
// //         weeklyData[`Week ${week}`].push(grade);
// //       }
// //     });

// //     return Object.entries(weeklyData).map(([week, grades]) => ({
// //       week,
// //       avgScore: grades.length > 0 
// //         ? Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length) 
// //         : 0
// //     }));
// //   };

// //   const viewEvaluation = (assignment) => {
// //     setSelectedEvaluation(assignment);
// //   };

// //   const handleScoreChange = (assignmentId, value) => {
// //     setStudentAssignments(prevAssignments =>
// //       prevAssignments.map(assignment =>
// //         assignment.id === assignmentId
// //           ? { ...assignment, teacherScore: value ? Number(value) : "" }
// //           : assignment
// //       )
// //     );

// //     // Optional: Send updated score to backend
// //     // axios.post(`http://localhost:5000/update_teacher_score/${assignmentId}`, { teacherScore: value })
// //     //   .then(response => console.log("Score updated"))
// //     //   .catch(err => console.error("Error updating score:", err));
// //   };

// //   if (loading) return <div className="loading">Loading assignment data...</div>;

// //   if (error) return (
// //     <div className="error-message">
// //       {error}
// //       <button onClick={() => window.location.reload()}>Retry</button>
// //     </div>
// //   );

// //   return (
// //     <div className="teacher-dashboard">
// //       <h2 className="dashboard-title">Teacher Dashboard</h2>
// //       <p className="dashboard-subtitle">Review and grade student assignments</p>

// //       <div className="assignment-reviews">
// //         <h3>Assignment Reviews</h3>
// //         <p>Review AI-graded assignments and provide feedback</p>
// //         <table className="assignment-table">
// //           <thead>
// //             <tr>
// //               <th>Student</th>
// //               <th>Roll No</th>
// //               <th>Assignment</th>
// //               <th>Date</th>
// //               <th>AI Score</th>
// //               <th>Teacher Score</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {studentAssignments.map((assignment) => (
// //               <tr key={assignment.id}>
// //                 <td>{assignment.studentName}</td>
// //                 <td>{assignment.studentRoll}</td>
// //                 <td>{assignment.title || "Untitled"}</td>
// //                 <td>{assignment.date_processed || "N/A"}</td>
// //                 <td>{assignment.grade ? `${assignment.grade}%` : "N/A"}</td>
// //                 <td>
// //                   <input
// //                     type="number"
// //                     value={assignment.teacherScore}
// //                     onChange={(e) => handleScoreChange(assignment.id, e.target.value)}
// //                     className="score-input"
// //                     min="0"
// //                     max="100"
// //                   />
// //                 </td>
// //                 <td>
// //                   <button
// //                     onClick={() => viewEvaluation(assignment)}
// //                     className="view-button"
// //                   >
// //                     View Details
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div className="dashboard-grid">
// //         <div className="dashboard-card">
// //           <h3>Class Performance</h3>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <LineChart data={performanceData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="week" />
// //               <YAxis domain={[0, 100]} />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 type="monotone"
// //                 dataKey="avgScore"
// //                 stroke="#3b82f6"
// //                 strokeWidth={2}
// //                 dot={{ r: 5 }}
// //                 name="Avg. Score"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="dashboard-card">
// //           <h3>Common Improvement Areas</h3>
// //           <ul className="feedback-list">
// //             {studentAssignments.length > 0 &&
// //             studentAssignments[0].parsedEvaluation?.areas_for_improvement ? (
// //               studentAssignments[0].parsedEvaluation.areas_for_improvement.map((area, index) => (
// //                 <li key={index}>{area}</li>
// //               ))
// //             ) : (
// //               <>
// //                 <li>Thesis statement clarity</li>
// //                 <li>Supporting evidence usage</li>
// //                 <li>Conclusion structure</li>
// //               </>
// //             )}
// //           </ul>
// //         </div>
// //       </div>

// //       {selectedEvaluation && (
// //         <div className="evaluation-modal">
// //           <div className="evaluation-content">
// //             <div className="modal-header">
// //               <h3>Evaluation Details</h3>
// //               <button
// //                 className="close-button"
// //                 onClick={() => setSelectedEvaluation(null)}
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <div className="evaluation-details">
// //               <h4>{selectedEvaluation.title || "Untitled Assignment"}</h4>
// //               <p><strong>Student:</strong> {selectedEvaluation.studentName}</p>
// //               <p><strong>Roll No:</strong> {selectedEvaluation.studentRoll}</p>
// //               <p><strong>Grade:</strong> {selectedEvaluation.grade || "N/A"}</p>

// //               <div className="evaluation-section">
// //                 <h5>Summary</h5>
// //                 <p>{selectedEvaluation.parsedEvaluation?.summary || "No summary available."}</p>
// //               </div>

// //               <div className="evaluation-section">
// //                 <h5>Strengths</h5>
// //                 <ul>
// //                   {selectedEvaluation.parsedEvaluation?.strengths?.map((strength, idx) => (
// //                     <li key={idx}>{strength}</li>
// //                   )) || <li>No strengths listed.</li>}
// //                 </ul>
// //               </div>

// //               <div className="evaluation-section">
// //                 <h5>Areas for Improvement</h5>
// //                 <ul>
// //                   {selectedEvaluation.parsedEvaluation?.areas_for_improvement?.map((area, idx) => (
// //                     <li key={idx}>{area}</li>
// //                   )) || <li>No improvement areas listed.</li>}
// //                 </ul>
// //               </div>

// //               <div className="evaluation-section">
// //                 <h5>Specific Feedback</h5>
// //                 <p>{selectedEvaluation.parsedEvaluation?.specific_feedback || "No specific feedback available."}</p>
// //               </div>

// //               <div className="evaluation-section">
// //                 <h5>Learning Plan</h5>
// //                 <ul>
// //                   {selectedEvaluation.parsedEvaluation?.personalized_learning_plan?.map((item, idx) => (
// //                     <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
// //                   )) || <li>No learning plan available.</li>}
// //                 </ul>
// //               </div>

// //               <div className="teacher-feedback">
// //                 <h5>Teacher Feedback</h5>
// //                 <textarea
// //                   placeholder="Add your feedback here..."
// //                   rows="4"
// //                   className="feedback-textarea"
// //                 ></textarea>
// //                 <div className="button-group">
// //                   <button className="save-button">Save Feedback</button>
// //                   <button className="download-button">Download Report</button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Fetch assignment data
    axios.get('http://localhost:5000/assignments')
      .then(response => {
        // Process the assignments data
        const processedAssignments = response.data.map(assignment => {
          let evaluationData = {};

          try {
            if (typeof assignment.evaluation === 'string') {
              evaluationData = JSON.parse(assignment.evaluation);
            } else if (typeof assignment.evaluation === 'object') {
              evaluationData = assignment.evaluation;
            }
          } catch (e) {
            console.error("Error parsing evaluation JSON:", e);
          }

          return {
            ...assignment,
            parsedEvaluation: evaluationData,
            teacherScore: assignment.teacherScore || "",
          };
        });

        setStudentAssignments(processedAssignments);
        
        // Generate performance data based on assignments
        if (processedAssignments.length > 0) {
          const weeklyPerformance = calculateClassPerformance(processedAssignments);
          setPerformanceData(weeklyPerformance);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching assignments:', err);
        setError("Failed to load assignment data");
        setLoading(false);
      });
  }, []);

  // Calculate class performance based on assignments
  const calculateClassPerformance = (assignments) => {
    // Group assignments by submission date (simplified for example)
    const weeklyData = {
      "Week 1": [],
      "Week 2": [],
      "Week 3": [],
      "Week 4": []
    };
    
    // Assign each assignment to a week based on date 
    // (this is simplified - you would adjust according to your actual data)
    assignments.forEach(assignment => {
      const grade = assignment.parsedEvaluation?.grade || 0;
      
      // Example sorting logic - replace with your actual date-based logic
      const assignmentDate = new Date(assignment.date_processed || Date.now());
      const week = Math.min(4, Math.ceil((Date.now() - assignmentDate) / (7 * 24 * 60 * 60 * 1000)));
      
      if (week >= 1 && week <= 4) {
        weeklyData[`Week ${week}`].push(grade);
      }
    });
    
    // Calculate average for each week
    return Object.entries(weeklyData).map(([week, grades]) => ({
      week,
      avgScore: grades.length > 0 
        ? Math.round(grades.reduce((sum, grade) => sum + grade, 0) / grades.length) 
        : 0
    }));
  };

  const viewEvaluation = (assignment) => {
    setSelectedEvaluation(assignment);
  };

  const handleScoreChange = (assignmentId, value) => {
    setStudentAssignments(prevAssignments => 
      prevAssignments.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, teacherScore: value ? Number(value) : "" } 
          : assignment
      )
    );
    
    // Optionally send the updated score to your backend
    // axios.post(`http://localhost:5000/update_teacher_score/${assignmentId}`, { teacherScore: value })
    //   .then(response => console.log("Score updated"))
    //   .catch(err => console.error("Error updating score:", err));
  };

  if (loading) return <div className="loading">Loading assignment data...</div>;
  
  if (error) return (
    <div className="error-message">
      {error}
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="teacher-dashboard">
      <h2 className="dashboard-title">Teacher Dashboard</h2>
      <p className="dashboard-subtitle">Review and grade student assignments</p>

      {/* Assignment Reviews */}
      <div className="assignment-reviews">
        <h3>Assignment Reviews</h3>
        <p>Review AI-graded assignments and provide feedback</p>
        <table className="assignment-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll No</th>
              <th>Assignment</th>
              <th>Date</th>
              <th>AI Score</th>
              <th>Teacher Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentAssignments.map((assignment) => {
              const evaluation = assignment.parsedEvaluation || {};
              
              return (
                <tr key={assignment.id}>
                  <td>{evaluation.student_name || "Unknown"}</td>
                  <td>{evaluation.student_roll || "Unknown"}</td>
                  <td>{assignment.title || "Untitled"}</td>
                  <td>{assignment.date_processed || "N/A"}</td>
                  <td>{evaluation.grade ? `${evaluation.grade}%` : "N/A"}</td>
                  <td>
                    <input
                      type="number"
                      value={assignment.teacherScore}
                      onChange={(e) => handleScoreChange(assignment.id, e.target.value)}
                      className="score-input"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td>
                    <button 
                      onClick={() => viewEvaluation(assignment)}
                      className="view-button"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Two-column layout */}
      <div className="dashboard-grid">
        {/* Class Performance Chart */}
        <div className="dashboard-card">
          <h3>Class Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 5 }} 
                name="Avg. Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Feedback Section */}
        <div className="dashboard-card">
          <h3>Common Improvement Areas</h3>
          <ul className="feedback-list">
            {studentAssignments.length > 0 && 
             studentAssignments[0].parsedEvaluation?.areas_for_improvement ? (
              studentAssignments[0].parsedEvaluation.areas_for_improvement.map((area, index) => (
                <li key={index}>{area}</li>
              ))
            ) : (
              <>
                <li>Thesis statement clarity</li>
                <li>Supporting evidence usage</li>
                <li>Conclusion structure</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Detailed Evaluation Modal */}
      {selectedEvaluation && (
        <div className="evaluation-modal">
          <div className="evaluation-content">
            <div className="modal-header">
              <h3>Evaluation Details</h3>
              <button 
                className="close-button"
                onClick={() => setSelectedEvaluation(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="evaluation-details">
              <h4>{selectedEvaluation.title || "Untitled Assignment"}</h4>
              <p><strong>Student:</strong> {selectedEvaluation.parsedEvaluation?.student_name || "Unknown"}</p>
              <p><strong>Roll No:</strong> {selectedEvaluation.parsedEvaluation?.student_roll || "Unknown"}</p>
              <p><strong>Grade:</strong> {selectedEvaluation.parsedEvaluation?.grade || "N/A"}</p>
              
              <div className="evaluation-section">
                <h5>Summary</h5>
                <p>{selectedEvaluation.parsedEvaluation?.summary || "No summary available."}</p>
              </div>
              
              <div className="evaluation-section">
                <h5>Strengths</h5>
                <ul>
                  {selectedEvaluation.parsedEvaluation?.strengths?.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  )) || <li>No strengths listed.</li>}
                </ul>
              </div>
              
              <div className="evaluation-section">
                <h5>Areas for Improvement</h5>
                <ul>
                  {selectedEvaluation.parsedEvaluation?.areas_for_improvement?.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  )) || <li>No improvement areas listed.</li>}
                </ul>
              </div>
              
              <div className="evaluation-section">
                <h5>Specific Feedback</h5>
                <p>{selectedEvaluation.parsedEvaluation?.specific_feedback || "No specific feedback available."}</p>
              </div>
              
              <div className="evaluation-section">
                <h5>Learning Plan</h5>
                <ul>
                  {selectedEvaluation.parsedEvaluation?.personalized_learning_plan?.map((item, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
                  )) || <li>No learning plan available.</li>}
                </ul>
              </div>
              
              <div className="teacher-feedback">
                <h5>Teacher Feedback</h5>
                <textarea 
                  placeholder="Add your feedback here..."
                  rows="4"
                  className="feedback-textarea"
                ></textarea>
                <div className="button-group">
                  <button className="save-button">Save Feedback</button>
                  <button className="download-button">Download Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;