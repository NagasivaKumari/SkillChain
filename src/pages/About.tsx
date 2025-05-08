import React from 'react';

const About: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">About SkillChain</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: 700, margin: '0 auto 2rem' }}>
          SkillChain is a next-generation online learning platform that leverages blockchain technology to provide secure, verifiable, and globally recognized certifications. Our mission is to empower learners and educators worldwide by making education accessible, transparent, and trustworthy.
        </p>
        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3>Blockchain Verified Certificates</h3>
            <p>All course completions and achievements are recorded on the blockchain, ensuring authenticity and global recognition.</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3>Expert Instructors</h3>
            <p>Learn from industry leaders and subject matter experts who are passionate about teaching and sharing knowledge.</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3>Flexible Learning</h3>
            <p>Access courses anytime, anywhere, and learn at your own pace with lifetime access to all purchased content.</p>
          </div>
        </div>
        <h2 style={{ margin: '2rem 0 1rem' }}>Our Team</h2>
        <div className="grid grid-3">
          {[1,2,3].map((i) => (
            <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#eee', margin: '0 auto 1rem' }}></div>
              <h4>Team Member {i}</h4>
              <p style={{ color: '#888' }}>Role {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 