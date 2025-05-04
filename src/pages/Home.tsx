import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => (
  <div className="home">
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to SkillChain</h1>
        <p>Learn, verify, and showcase your skills with blockchain technology</p>
        <div className="hero-buttons">
          <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
          <Link to="/login" className="btn btn-secondary">Get Started</Link>
        </div>
      </div>
    </section>
    <section className="features">
      <h2>Why Choose SkillChain?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Blockchain Verified</h3>
          <p>Your skills and achievements are securely stored on the blockchain</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Quality Courses</h3>
          <p>Learn from industry experts and top educators</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💼</div>
          <h3>Career Ready</h3>
          <p>Get noticed by employers with verifiable credentials</p>
        </div>
      </div>
    </section>
    <section className="cta">
      <h2>Ready to Start Your Learning Journey?</h2>
      <p>Join thousands of learners who are already building their future with SkillChain</p>
      <Link to="/signup" className="btn btn-primary">Sign Up Now</Link>
    </section>
  </div>
);

export default Home; 