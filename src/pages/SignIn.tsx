import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlgorand } from '../contexts/AlgorandContext';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { connectWallet } = useAlgorand();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // In a real app, you would verify credentials with your backend
      await connectWallet();
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Sign in error:', err);
    }
  };

  return (
    <div className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
      <div className="container">
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="text-center mb-4">Sign In to Your Account</h2>
          
          {error && (
            <div style={{ 
              backgroundColor: '#fee', 
              color: '#c00', 
              padding: '1rem', 
              borderRadius: '0.25rem', 
              marginBottom: '1rem' 
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ color: 'var(--primary-color)' }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>

          <div className="text-center mt-3">
            <p>Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'var(--primary-color)' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 