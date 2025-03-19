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
import React, { useState } from "react";
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
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
   const [teacherScores, setTeacherScores] = useState({
      johnDoe: 85,
      janeSmith: 92,
      aliceJohnson: "",
   });

   const handleScoreChange = (student, value) => {
      setTeacherScores((prev) => ({
         ...prev,
         [student]: value ? Number(value) : "",
      }));
   };

   const performanceData = [
      { week: "Week 1", avgScore: 78 },
      { week: "Week 2", avgScore: 82 },
      { week: "Week 3", avgScore: 85 },
      { week: "Week 4", avgScore: 88 },
   ];

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
                     <th>Assignment</th>
                     <th>AI Score</th>
                     <th>Teacher Score</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {Object.entries(teacherScores).map(([student, score]) => (
                     <tr key={student}>
                        <td>{student.replace(/([A-Z])/g, " $1").trim()}</td>
                        <td>Essay 1</td>
                        <td>{score ? `${score - 5}%` : "N/A"}</td>
                        <td>
                           <input
                              type="number"
                              value={score}
                              onChange={(e) => handleScoreChange(student, e.target.value)}
                              className="score-input"
                           />
                        </td>
                        <td>{score !== "" ? "✅" : "❌"}</td>
                     </tr>
                  ))}
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
                     <YAxis domain={[75, 90]} />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>

            {/* AI Feedback Section */}
            <div className="dashboard-card">
               <h3>Recent AI Feedback</h3>
               <ul className="feedback-list">
                  <li>Thesis statement clarity</li>
                  <li>Supporting evidence usage</li>
                  <li>Conclusion structure</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default TeacherDashboard;



