import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlgorandTest from '../AlgorandTest';

const Dashboard: React.FC = () => {
  // Simulate course and exam completion for demo
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [examPassed, setExamPassed] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem('skillchain_user_email'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {userEmail && (
        <div style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
          Welcome, <b>{userEmail}</b>!
        </div>
      )}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Course Progress</h3>
        <div>
          <span>Course Completion: </span>
          <button onClick={() => setCourseCompleted(true)} disabled={courseCompleted}>
            {courseCompleted ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span>Exam Completion: </span>
          <button onClick={() => setExamPassed(true)} disabled={!courseCompleted || examPassed}>
            {examPassed ? 'Passed' : 'Take Exam'}
          </button>
        </div>
      </div>
      {/* Continue Learning Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Continue Learning</h3>
        <button
          style={{ background: '#007bff', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 4, fontSize: '1rem' }}
          onClick={() => navigate('/courses')}
        >
          Go to My Courses
        </button>
      </div>
      {/* Show certification system only after both are done */}
      {courseCompleted && examPassed && <AlgorandTest />}
    </div>
  );
};

export default Dashboard; 