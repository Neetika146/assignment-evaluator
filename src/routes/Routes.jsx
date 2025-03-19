import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/Home/Home';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import AssignmentUpload from '../components/Upload/AssignmentUpload';
import TeacherDashboard from '../components/TeacherDashboard'; // ✅ Import TeacherDashboard
import './Routes.css';
import '../components/Dashboard/Dashboard.css';

const AppRoutes = () => {
   return (
      <div className="app-container">
         <Router>
            <div className="page-container">
               <Routes>
                  {/* Base Landing Page */}
                  <Route path="/" element={<Home />} />

                  {/* Student Dashboard */}
                  <Route path="/dashboard" element={<StudentDashboard />} />

                  {/* Assignment Upload */}
                  <Route path="/upload-assignment" element={<AssignmentUpload />} />

                  {/* ✅ Teacher Dashboard */}
                  <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

                  {/* Redirect for unknown routes */}
                  <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
            </div>
         </Router>
      </div>
   );
};

export default AppRoutes;
