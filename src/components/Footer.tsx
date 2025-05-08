import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--text-color)',
      color: 'white',
      padding: '4rem 0 2rem'
    }}>
      <div className="container">
        <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
          {/* Company Info */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>SkillChain</h3>
            <p style={{ color: '#999', lineHeight: '1.6' }}>
              Empowering learners worldwide with blockchain-verified skills and certifications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['About Us', 'Courses', 'Instructors', 'Blog'].map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: '#999', textDecoration: 'none' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: '#999', textDecoration: 'none' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Stay Updated</h3>
            <p style={{ color: '#999', marginBottom: '1rem' }}>
              Subscribe to our newsletter for the latest updates.
            </p>
            <form style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  flex: 1
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#999'
        }}>
          <p>© {new Date().getFullYear()} SkillChain. All rights reserved.</p>
          <div style={{ marginTop: '1rem' }}>
            {/* Social Media Links */}
            <a href="https://www.facebook.com/skillchain" target="_blank" rel="noopener noreferrer" style={{ color: '#999', margin: '0 0.5rem', textDecoration: 'none' }}>Facebook</a>
            <a href="https://www.twitter.com/skillchain" target="_blank" rel="noopener noreferrer" style={{ color: '#999', margin: '0 0.5rem', textDecoration: 'none' }}>Twitter</a>
            <a href="https://www.linkedin.com/company/skillchain" target="_blank" rel="noopener noreferrer" style={{ color: '#999', margin: '0 0.5rem', textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://www.instagram.com/skillchain" target="_blank" rel="noopener noreferrer" style={{ color: '#999', margin: '0 0.5rem', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 