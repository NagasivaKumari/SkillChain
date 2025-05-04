import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Courses.css';

const courseData: Record<string, { title: string; description: string }> = {
  '3fUZENyWpB0': {
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology in this beginner-friendly course.',
  },
  'ix9cRaBkVe0': {
    title: 'Smart Contracts Introduction',
    description: 'Get started with smart contracts and how they work on the blockchain.',
  },
};

const CoursePlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const course = videoId ? courseData[videoId] : undefined;

  if (!course) {
    return <div style={{ padding: '2rem' }}>Course not found.</div>;
  }

  return (
    <div className="courses-page">
      <Link to="/dashboard" className="btn btn-primary" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        &larr; Back to Dashboard
      </Link>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <div className="video-wrapper">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Notes & Resources</h2>
        <p>Feature coming soon! Here you will find downloadable resources and a place to take notes.</p>
      </div>
    </div>
  );
};

export default CoursePlayer; 