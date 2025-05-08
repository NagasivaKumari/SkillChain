import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ padding: '1rem', background: '#222', color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
    &copy; {new Date().getFullYear()} SkillChain. All rights reserved.
  </footer>
);

export default Footer; 