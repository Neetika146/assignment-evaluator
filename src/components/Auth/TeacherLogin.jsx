import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './TeacherLogin.css';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
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
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          role: 'teacher'
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (!docSnap.exists() || docSnap.data().role !== 'teacher') {
          throw new Error('This account is not registered as a teacher.');
        }
      }
      navigate('/teacher-dashboard');
    } catch (error) {
      console.error("Auth error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-login-container">
      <div className="login-box">
        <h1>Teacher {isSignUp ? 'Sign Up' : 'Login'}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleAuth}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Login'}</button>
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: 'blue', cursor: 'pointer' }}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeacherLogin;
