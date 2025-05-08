import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const courses = [
  {
    id: 'blockchain-basics',
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology in this beginner-friendly course.',
    youtubeUrl: 'https://www.youtube.com/watch?v=3fUZENyWpB0',
    videoId: '3fUZENyWpB0',
  },
  {
    id: 'smart-contracts-intro',
    title: 'Smart Contracts Introduction',
    description: 'Get started with smart contracts and how they work on the blockchain.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ix9cRaBkVe0',
    videoId: 'ix9cRaBkVe0',
  },
  {
    id: 'algorand-tutorial',
    title: 'Algorand Blockchain Tutorial',
    description: 'A practical guide to building on Algorand.',
    youtubeUrl: 'https://www.youtube.com/watch?v=V6Yqr7prI2I',
    videoId: 'V6Yqr7prI2I',
  },
  {
    id: 'blockchain-apps',
    title: 'Building Blockchain Apps',
    description: 'Learn how to build decentralized applications on blockchain.',
    youtubeUrl: 'https://www.youtube.com/watch?v=K5KVEU3aaeQ',
    videoId: 'K5KVEU3aaeQ',
  },
];

const Courses: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="courses-page">
      <h1>Courses</h1>
      <div className="courses-list">
        {courses.map((course, idx) => (
          <div className="course-card" key={idx}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="video-wrapper">
              <iframe
                width="360"
                height="215"
                src={`https://www.youtube.com/embed/${course.videoId}`}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button className="btn btn-primary" onClick={() => navigate(`/course/${course.id}`)}>
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 