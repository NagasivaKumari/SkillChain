import React, { useState } from 'react';
import './RecruiterDashboard.css';

const RecruiterDashboard: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [postedJobs, setPostedJobs] = useState<{title: string, desc: string}[]>([]);
  const [search, setSearch] = useState('');
  const [candidates] = useState([
    { name: 'Alice Johnson', skills: 'Blockchain, Solidity, React', certificate: 'Verified' },
    { name: 'Bob Smith', skills: 'Web3, Node.js, MongoDB', certificate: 'Verified' },
    { name: 'Charlie Lee', skills: 'Smart Contracts, TypeScript', certificate: 'Not Verified' },
  ]);

  const handleJobPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle && jobDesc) {
      setPostedJobs([...postedJobs, { title: jobTitle, desc: jobDesc }]);
      setJobTitle('');
      setJobDesc('');
    }
  };

  return (
    <div className="recruiter-dashboard">
      <h1>Welcome, Recruiter</h1>
      <p>Find top talent, post jobs, and verify blockchain certificates.</p>
      <div className="recruiter-sections">
        <section className="recruiter-section">
          <h2>Candidate Search</h2>
          <input
            type="text"
            placeholder="Search by skill or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="candidate-list">
            {candidates.filter(c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.skills.toLowerCase().includes(search.toLowerCase())
            ).map((c, idx) => (
              <div className="candidate-card" key={idx}>
                <h3>{c.name}</h3>
                <p><strong>Skills:</strong> {c.skills}</p>
                <p><strong>Certificate:</strong> {c.certificate}</p>
                <button className="btn btn-primary">View Profile</button>
              </div>
            ))}
          </div>
        </section>
        <section className="recruiter-section">
          <h2>Post a Job</h2>
          <form onSubmit={handleJobPost} className="job-form">
            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Job Description"
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Post Job</button>
          </form>
          <div className="posted-jobs">
            {postedJobs.map((job, idx) => (
              <div className="job-card" key={idx}>
                <h4>{job.title}</h4>
                <p>{job.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="recruiter-section">
          <h2>Certificate Verification</h2>
          <p>Enter a certificate ID to verify its authenticity (UI only):</p>
          <input type="text" placeholder="Certificate ID" className="search-input" />
          <button className="btn btn-primary" style={{marginTop: '0.5rem'}}>Verify</button>
        </section>
      </div>
    </div>
  );
};

export default RecruiterDashboard; 