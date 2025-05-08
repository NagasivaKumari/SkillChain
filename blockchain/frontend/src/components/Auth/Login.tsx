import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }
    // Simulate login logic
    localStorage.setItem('skillchain_user_email', email);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <div style={{ margin: '1.5rem 0 0.5rem 0', textAlign: 'center' }}>
        <span>or</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button type="button" style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: 4 }}>
          Log in with Google
        </button>
        <button type="button" style={{ background: '#0077b5', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: 4 }}>
          Log in with LinkedIn
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span>No account? </span>
        <Link to="/signup" style={{ color: '#0077b5', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</Link>
      </div>
    </div>
  );
};

export default Login; 