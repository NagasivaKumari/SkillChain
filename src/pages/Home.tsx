import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Learn New Skills Online with Top Educators
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Build skills with courses, certificates, and degrees online from world-class universities and companies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/courses" className="btn btn-secondary" style={{ color: 'white' }}>Browse Courses</Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="grid grid-4">
            {['Development', 'Business', 'Finance', 'Design'].map((category) => (
              <div key={category} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3>{category}</h3>
                <p className="mt-2">Explore {category.toLowerCase()} courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <div className="grid grid-3">
            {[1, 2, 3].map((course) => (
              <div key={course} className="card">
                <div style={{ height: '200px', backgroundColor: '#eee' }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <h3>Course Title {course}</h3>
                  <p className="mt-2">Learn the fundamentals of this topic with our expert instructors.</p>
                  <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>4.5 ★</span>
                    <Link to={`/courses/${course}`} className="btn btn-primary">Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose SkillChain</h2>
          <div className="grid grid-3">
            {[
              {
                title: 'Expert Instructors',
                description: 'Learn from industry experts who are passionate about teaching.'
              },
              {
                title: 'Learn at Your Own Pace',
                description: 'Enjoy lifetime access to courses on SkillChain\'s website and app.'
              },
              {
                title: 'Blockchain Verified',
                description: 'Get blockchain-verified certificates that you can share with employers.'
              }
            ].map((feature) => (
              <div key={feature.title} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3>{feature.title}</h3>
                <p className="mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 