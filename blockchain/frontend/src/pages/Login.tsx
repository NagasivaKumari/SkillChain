import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('student');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    if (email && password) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedUserType', userType);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedUserType');
      }

      if (userType === 'student') {
        navigate('/dashboard');
      } else {
        navigate('/recruiter-dashboard');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Log in to continue your learning journey</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
            Continue with email
          </button>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>or</div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: '#4285F4', color: '#fff', border: 'none', marginBottom: '1rem' }}
            onClick={() => alert('Google login coming soon!')}
          >
            <span style={{ marginRight: 8 }}>G</span> Continue with Google
          </button>
          <div className="form-footer">
            <Link to="/forgot-password">Forgot Password?</Link>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 