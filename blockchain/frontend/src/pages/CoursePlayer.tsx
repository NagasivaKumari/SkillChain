import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Courses.css';

const courses = [
  {
    id: 'blockchain-basics',
    title: 'Blockchain Basics',
    description: 'Learn the fundamentals of blockchain technology in this beginner-friendly course.',
    videoId: '3fUZENyWpB0',
    quiz: {
      question: 'What is a blockchain?',
      options: [
        'A type of cryptocurrency',
        'A distributed ledger technology',
        'A programming language',
        'A centralized database',
      ],
      answer: 1,
    },
  },
  {
    id: 'smart-contracts-intro',
    title: 'Smart Contracts Introduction',
    description: 'Get started with smart contracts and how they work on the blockchain.',
    videoId: 'ix9cRaBkVe0',
    quiz: {
      question: 'What is a smart contract?',
      options: [
        'A legal document',
        'A self-executing contract with the terms directly written into code',
        'A type of blockchain',
        'A cryptocurrency wallet',
      ],
      answer: 1,
    },
  },
  {
    id: 'algorand-tutorial',
    title: 'Algorand Blockchain Tutorial',
    description: 'A practical guide to building on Algorand.',
    videoId: 'V6Yqr7prI2I',
    quiz: {
      question: 'Which consensus mechanism does Algorand use?',
      options: [
        'Proof of Work',
        'Proof of Stake',
        'Pure Proof of Stake',
        'Delegated Proof of Stake',
      ],
      answer: 2,
    },
  },
  {
    id: 'blockchain-apps',
    title: 'Building Blockchain Apps',
    description: 'Learn how to build decentralized applications on blockchain.',
    videoId: 'K5KVEU3aaeQ',
    quiz: {
      question: 'What is a dApp?',
      options: [
        'A decentralized application',
        'A desktop application',
        'A data analytics platform',
        'A digital asset protocol',
      ],
      answer: 0,
    },
  },
];

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  if (!course) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Course Not Found</h2>
        <button onClick={() => navigate('/courses')}>Back to Courses</button>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    setSubmitted(true);
    if (selected === course.quiz.answer) {
      setPassed(true);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <div style={{ margin: '2rem 0' }}>
        <iframe
          width="700"
          height="400"
          src={`https://www.youtube.com/embed/${course.videoId}`}
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* Quiz Section */}
      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: 8 }}>
        <h3>Quiz</h3>
        <p><b>{course.quiz.question}</b></p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {course.quiz.options.map((opt, idx) => (
            <label key={idx} style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="quiz"
                value={idx}
                checked={selected === idx}
                onChange={() => setSelected(idx)}
                disabled={submitted}
              />{' '}
              {opt}
            </label>
          ))}
        </div>
        {!submitted && (
          <button
            style={{ marginTop: '1rem', background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }}
            onClick={handleQuizSubmit}
            disabled={selected === null}
          >
            Submit
          </button>
        )}
        {submitted && passed && (
          <div style={{ color: 'green', marginTop: '1rem' }}>
            Correct! You passed the quiz.<br />
            <button style={{ marginTop: '1rem', background: '#28a745', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }}>
              Claim Certificate
            </button>
          </div>
        )}
        {submitted && !passed && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            Incorrect answer. Please review the course and try again.
          </div>
        )}
      </div>
      <button onClick={() => navigate('/courses')} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 4, fontSize: '1rem' }}>
        Back to Courses
      </button>
    </div>
  );
};

export default CoursePlayer; 