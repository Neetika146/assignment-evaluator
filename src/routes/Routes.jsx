import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/Home/Home';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import AssignmentUpload from '../components/Upload/AssignmentUpload';
import AssignmentUploadhandwritten from '../components/Upload/AssignmentUploadhandwritten';
import AssignmentType from '../components/Upload/AssignmentType';
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

                  {/* Assignment Upload handwritten*/}
                  <Route path="/upload-assignment-handwritten" element={<AssignmentUploadhandwritten />} />

                  {/* Assignment Type Choose */}
                  <Route path="/upload-assignment-type" element={<AssignmentType />} />

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
//import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
//import { useState, useEffect } from 'react';
//import { onAuthStateChanged } from 'firebase/auth';
//import { auth } from '../firebase/config'; // Ensure you have this config file
//import Home from '../components/Home/Home';
//import StudentLogin from '../components/Auth/StudentLogin'; // You'll need to create this
//import StudentDashboard from '../components/Dashboard/StudentDashboard';
//import AssignmentUpload from '../components/Upload/AssignmentUpload';
//import AssignmentUploadhandwritten from '../components/Upload/AssignmentUploadhandwritten';
//import AssignmentType from '../components/Upload/AssignmentType';
//import TeacherDashboard from '../components/TeacherDashboard'; // ✅ Import TeacherDashboard
//import './Routes.css';
//import '../components/Dashboard/Dashboard.css';

//// Protected route component that requires authentication
//const ProtectedRoute = ({ children }) => {
//  const [user, setUser] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const location = useLocation();

//  useEffect(() => {
//    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//      setUser(currentUser);
//      setLoading(false);
//    });

//    return () => unsubscribe();
//  }, []);

//  if (loading) {
//    return <div className="loading-container">Loading...</div>;
//  }

//  if (!user) {
//    // Redirect to login, but save the intended destination
//    return <Navigate to="/student-login" state={{ from: location }} replace />;
//  }

//  return children;
//};

//const AppRoutes = () => {
//  return (
//    <div className="app-container">
//      <Router>
//        <div className="page-container">
//          <Routes>
//            {/* Base Landing Page */}
//            <Route path="/" element={<Home />} />
            
//            {/* Student Login Page */}
//            <Route path="/student-login" element={<StudentLogin />} />
            
//            {/* Student Dashboard */}
//            <Route path="/dashboard" element={
//              <ProtectedRoute>
//                <StudentDashboard />
//              </ProtectedRoute>
//            } />
            
//            {/* Assignment Upload */}
//            <Route path="/upload-assignment" element={
//              <ProtectedRoute>
//                <AssignmentUpload />
//              </ProtectedRoute>
//            } />
            
//            {/* Assignment Upload handwritten*/}
//            <Route path="/upload-assignment-handwritten" element={
//              <ProtectedRoute>
//                <AssignmentUploadhandwritten />
//              </ProtectedRoute>
//            } />
            
//            {/* Assignment Type Choose */}
//            <Route path="/upload-assignment-type" element={
//              <ProtectedRoute>
//                <AssignmentType />
//              </ProtectedRoute>
//            } />
            
//            {/* ✅ Teacher Dashboard */}
//            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            
//            {/* Redirect for unknown routes */}
//            <Route path="*" element={<Navigate to="/" replace />} />
//          </Routes>
//        </div>
//      </Router>
//    </div>
//  );
//};

//export default AppRoutes;








//import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
//import { useEffect, useState } from 'react';
//import { onAuthStateChanged } from 'firebase/auth';
//import { doc, getDoc } from 'firebase/firestore';
//import { auth, db } from '../firebase/config';

//import Home from '../components/Home/Home';
//import StudentLogin from '../components/Auth/StudentLogin';
//import TeacherLogin from '../components/Auth/TeacherLogin';
//import StudentDashboard from '../components/Dashboard/StudentDashboard';
//import TeacherDashboard from '../components/TeacherDashboard';
//import AssignmentUpload from '../components/Upload/AssignmentUpload';
//import AssignmentUploadhandwritten from '../components/Upload/AssignmentUploadhandwritten';
//import AssignmentType from '../components/Upload/AssignmentType';

//import './Routes.css';
//import '../components/Dashboard/Dashboard.css';

//const ProtectedRoute = ({ children, role }) => {
//  const [user, setUser] = useState(null);
//  const [userRole, setUserRole] = useState(null);
//  const [loading, setLoading] = useState(true);
//  const location = useLocation();

//  useEffect(() => {
//    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//      if (currentUser) {
//        const userRef = doc(db, 'users', currentUser.uid);
//        const userSnap = await getDoc(userRef);
//        if (userSnap.exists()) {
//          setUser(currentUser);
//          setUserRole(userSnap.data().role);
//        }
//      }
//      setLoading(false);
//    });
//    return () => unsubscribe();
//  }, []);

//  if (loading) return <div className="loading-container">Loading...</div>;

//  if (!user) {
//    return <Navigate to={role === 'student' ? '/student-login' : '/teacher-login'} state={{ from: location }} replace />;
//  }

//  if (userRole !== role) return <Navigate to="/" replace />;

//  return children;
//};

//const AppRoutes = () => {
//  return (
//    <div className="app-container">
//      <Router>
//        <div className="page-container">
//          <Routes>
//            {/* Public Routes */}
//            <Route path="/" element={<Home />} />
//            <Route path="/student-login" element={<StudentLogin />} />
//            <Route path="/teacher-login" element={<TeacherLogin />} />

//            {/* Student Protected Routes */}
//            <Route path="/dashboard" element={
//              <ProtectedRoute role="student">
//                <StudentDashboard />
//              </ProtectedRoute>
//            } />
//            <Route path="/upload-assignment" element={
//              <ProtectedRoute role="student">
//                <AssignmentUpload />
//              </ProtectedRoute>
//            } />
//            <Route path="/upload-assignment-handwritten" element={
//              <ProtectedRoute role="student">
//                <AssignmentUploadhandwritten />
//              </ProtectedRoute>
//            } />
//            <Route path="/upload-assignment-type" element={
//              <ProtectedRoute role="student">
//                <AssignmentType />
//              </ProtectedRoute>
//            } />

//            {/* Teacher Protected Route */}
//            <Route path="/teacher-dashboard" element={
//              <ProtectedRoute role="teacher">
//                <TeacherDashboard />
//              </ProtectedRoute>
//            } />

//            {/* Catch-All */}
//            <Route path="*" element={<Navigate to="/" replace />} />
//          </Routes>
//        </div>
//      </Router>
//    </div>
//  );
//};

//export default AppRoutes;
