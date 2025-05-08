import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlgorand } from '../contexts/AlgorandContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { account } = useAlgorand();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          textDecoration: 'none'
        }}>
          SkillChain
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/courses" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            Courses
          </Link>
          <Link to="/about" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            About
          </Link>
          {account ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link to="/profile" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div style={{
          display: 'none',
          padding: '1rem',
          backgroundColor: 'white',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/courses" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
              Courses
            </Link>
            <Link to="/about" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
              About
            </Link>
            {account ? (
              <>
                <Link to="/dashboard" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                  Dashboard
                </Link>
                <Link to="/profile" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                  Sign In
                </Link>
                <Link to="/signup" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .container > div:not(:first-child) {
              display: none;
            }
            button[style*="display: none"] {
              display: block !important;
            }
            div[style*="display: none"] {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar; 