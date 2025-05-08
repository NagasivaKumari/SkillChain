import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav style={{ padding: '1rem', background: '#222', color: '#fff', position: 'relative' }}>
    <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
    <Link to="/courses" style={{ color: '#fff', marginRight: '1rem' }}>Courses</Link>
    <Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</Link>
    <Link to="/certificates" style={{ color: '#fff', marginRight: '1rem' }}>Certificates</Link>
    <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>
  </nav>
);

export default Navbar; 