import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!name || !username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Add signup logic here
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
        <button type="submit">Signup</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Signup successful! Redirecting to login...</div>}
      </form>
      <div style={{ margin: '1.5rem 0 0.5rem 0', textAlign: 'center' }}>
        <span>or</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button type="button" style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: 4 }}>
          Signup with Google
        </button>
        <button type="button" style={{ background: '#0077b5', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: 4 }}>
          Signup with LinkedIn
        </button>
      </div>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span>Have an account? </span>
        <Link to="/login" style={{ color: '#0077b5', textDecoration: 'underline', cursor: 'pointer' }}>Log in</Link>
      </div>
    </div>
  );
};

export default Signup; 