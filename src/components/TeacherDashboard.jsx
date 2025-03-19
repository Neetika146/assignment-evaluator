import React, { useState } from 'react';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
   const [teacherScores, setTeacherScores] = useState({
      johnDoe: 85,
      janeSmith: 92,
      aliceJohnson: '',
   });

   const handleScoreChange = (student, value) => {
      setTeacherScores(prev => ({
         ...prev,
         [student]: value,
      }));
   };

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
                  <tr>
                     <td>John Doe</td>
                     <td>Essay 1</td>
                     <td>80%</td>
                     <td>
                        <input
                           type="number"
                           value={teacherScores.johnDoe}
                           onChange={(e) => handleScoreChange('johnDoe', e.target.value)}
                        />
                     </td>
                     <td>✅</td>
                  </tr>
                  <tr>
                     <td>Jane Smith</td>
                     <td>Essay 1</td>
                     <td>92%</td>
                     <td>
                        <input
                           type="number"
                           value={teacherScores.janeSmith}
                           onChange={(e) => handleScoreChange('janeSmith', e.target.value)}
                        />
                     </td>
                     <td>✅</td>
                  </tr>
                  <tr>
                     <td>Alice Johnson</td>
                     <td>Essay 1</td>
                     <td>75%</td>
                     <td>
                        <button className="score-button">Score</button>
                     </td>
                     <td>❌</td>
                  </tr>
               </tbody>
            </table>
         </div>

         {/* Bottom Section */}
         <div className="bottom-section">
            {/* Class Performance */}
            <div className="class-performance">
               <h3>Class Performance</h3>
               <div className="performance-placeholder">
                  Performance chart will be displayed here
               </div>
            </div>

            {/* Recent AI Feedback */}
            <div className="recent-feedback">
               <h3>Recent AI Feedback</h3>
               <div className="feedback-content">
                  <strong>Common Areas for Improvement</strong>
                  <ul>
                     <li>Thesis statement clarity</li>
                     <li>Supporting evidence usage</li>
                     <li>Conclusion structure</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeacherDashboard;
