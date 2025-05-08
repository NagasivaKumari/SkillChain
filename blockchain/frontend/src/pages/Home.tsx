import React from 'react';

const Home: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
    <h1>Welcome to SkillChain</h1>
    <p>
      <b>SkillChain</b> is a next-generation platform for skill certification and verification, powered by blockchain technology. Our mission is to make skill credentials tamper-proof, instantly verifiable, and globally recognized.
    </p>
    <h2>Why SkillChain?</h2>
    <ul>
      <li><b>Blockchain Certificates:</b> All certifications are issued as digital assets on the Algorand blockchain, ensuring authenticity and security.</li>
      <li><b>Easy Verification:</b> Employers and institutions can instantly verify your skills and credentials online.</li>
      <li><b>Transparent Progress:</b> Track your learning journey, complete courses, take exams, and earn certificates that truly belong to you.</li>
      <li><b>Shareable Achievements:</b> Add your certificates to LinkedIn, share on social media, or download as a PDF.</li>
    </ul>
    <p style={{marginTop: '2rem'}}><b>Get started by signing up or logging in above!</b></p>
  </div>
);

export default Home; 