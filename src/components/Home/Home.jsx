import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
   const navigate = useNavigate();

   return (
      <div className="home-container">
         {/* Floating Elements */}
         <div className="floating-element type-0">📚</div> {/* Book */}
         <div className="floating-element type-1">🎓</div> {/* Cap */}
         <div className="floating-element type-2">📄</div> {/* Card */}
         <div className="floating-element type-3">🏆</div> {/* Degree */}
         <div className="floating-element type-4">🖊️</div> {/* Study */}
         <div className="floating-element type-5">👩‍🏫</div> {/* Teacher */}

         {/* Main Content */}
         <div className="content-box">
            <div className="logo">📖</div>
            <h1 className="title">Learning Harbour</h1>
            <p className="description">
               Your educational journey begins here. Connect with teachers and access your learning resources in one place.
            </p>
            <div className="button-group">
               <button className="button student" onClick={() => navigate('/dashboard')}>
                  👨‍🎓 I am a Student
               </button>
               <button className="button teacher" onClick={() => navigate('/teacher-dashboard')}>
                  👩‍🏫 I am a Teacher
               </button>
            </div>
            <p className="footer">© 2025 Learning Harbour. All rights reserved.</p>
         </div>
      </div>
   );
};

export default Home;


//import { useNavigate } from 'react-router-dom';
//import './Home.css';

//const Home = () => {
//   const navigate = useNavigate();

//   return (
//      <div className="home-container">
//         <div className="floating-element type-0">📚</div>
//         <div className="floating-element type-1">🎓</div>
//         <div className="floating-element type-2">📄</div>
//         <div className="floating-element type-3">🏆</div>
//         <div className="floating-element type-4">🖊️</div>
//         <div className="floating-element type-5">👩‍🏫</div>

//         <div className="content-box">
//            <div className="logo">📖</div>
//            <h1 className="title">Learning Harbour</h1>
//            <p className="description">
//               Your educational journey begins here. Connect with teachers and access your learning resources in one place.
//            </p>
//            <div className="button-group">
//               <button className="button student" onClick={() => navigate('/student-login')}>
//                  👨‍🎓 I am a Student
//               </button>
//               <button className="button teacher" onClick={() => navigate('/teacher-login')}>
//                  👩‍🏫 I am a Teacher
//               </button>
//            </div>
//            <p className="footer">© 2025 Learning Harbour. All rights reserved.</p>
//         </div>
//      </div>
//   );
//};

//export default Home;

