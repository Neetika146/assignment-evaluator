import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student'); // default
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, role, userCredential.user.uid);
        await setDoc(userRef, {
          email: email,
          role: role,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const uid = userCredential.user.uid;
      const studentRef = doc(db, 'student', uid);
      const teacherRef = doc(db, 'Teacher', uid);
      const studentDoc = await getDoc(studentRef);
      const teacherDoc = await getDoc(teacherRef);

      if (studentDoc.exists()) {
        navigate('/dashboard');
      } else if (teacherDoc.exists()) {
        navigate('/teacher-dashboard');
      } else {
        setError("User role not assigned.");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
      <form onSubmit={handleAuth}>
        {isSignUp && (
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Login'}
        </button>
      </form>

      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
