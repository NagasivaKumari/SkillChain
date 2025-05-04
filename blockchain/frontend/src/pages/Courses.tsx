import React from 'react';
import './Courses.css';

const courses = [
  {
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology in this beginner-friendly course.',
    youtubeUrl: 'https://www.youtube.com/watch?v=3fUZENyWpB0',
    videoId: '3fUZENyWpB0',
  },
  {
    title: 'Smart Contracts Introduction',
    description: 'Get started with smart contracts and how they work on the blockchain.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ix9cRaBkVe0',
    videoId: 'ix9cRaBkVe0',
  },
];

const Courses: React.FC = () => {
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
            <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 