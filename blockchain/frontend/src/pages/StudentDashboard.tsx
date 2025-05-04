import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const enrolledCourses = [
  {
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology in this beginner-friendly course.',
    videoId: '3fUZENyWpB0',
  },
  {
    title: 'Smart Contracts Introduction',
    description: 'Get started with smart contracts and how they work on the blockchain.',
    videoId: 'ix9cRaBkVe0',
  },
];

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeName, setResumeName] = useState<string>('');
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(false);

  const handleContinueLearning = (videoId: string) => {
    navigate(`/course-player/${videoId}`);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
      setResumeUploaded(false);
    }
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeName) {
      setResumeUploaded(true);
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <p>Track your learning progress, view certificates, and upload your resume.</p>

      <div className="dashboard-section">
        <h2>Enrolled Courses</h2>
        <div className="enrolled-courses-list">
          {enrolledCourses.map((course, idx) => (
            <div className="enrolled-course-card" key={idx}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn btn-primary" onClick={() => handleContinueLearning(course.videoId)}>
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Certificates</h2>
        <div className="certificates-list">
          <div className="certificate-card placeholder">
            <p>Certificate feature coming soon! Your blockchain-verified certificates will appear here.</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Resume Upload</h2>
        <form onSubmit={handleResumeSubmit}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleResumeUpload}
            accept=".pdf,.doc,.docx"
          />
          {resumeName && <p>Uploaded: {resumeName}</p>}
          <button type="submit" className="btn btn-primary" disabled={!resumeName}>Submit Resume</button>
        </form>
        {resumeUploaded && <p className="success-message">Resume submitted successfully! (UI only)</p>}
        <p className="small-text">(Resume upload is UI only for now.)</p>
      </div>
    </div>
  );
};

export default StudentDashboard; 