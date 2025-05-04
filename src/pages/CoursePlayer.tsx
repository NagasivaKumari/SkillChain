import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CoursePlayer.css';

interface Note {
  id: number;
  timestamp: string;
  text: string;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'exercise';
  description: string;
  notes: Note[];
}

interface Resource {
  id: number;
  title: string;
  type: string;
  size: string;
}

interface Discussion {
  id: number;
  user: string;
  avatar: string;
  timestamp: string;
  content: string;
  replies: number;
  likes: number;
}

const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'discussions'>('content');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  // Mock data
  const course = {
    id: courseId,
    title: 'Blockchain Fundamentals',
    instructor: 'John Smith',
    rating: 4.8,
    enrolled: 12500,
    lastUpdated: '2 weeks ago',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Blockchain',
        duration: '15:30',
        completed: true,
        type: 'video',
        description: 'Learn the basics of blockchain technology and its applications.',
        notes: [
          { id: 1, timestamp: '2:30', text: 'Key concept: Decentralization' },
          { id: 2, timestamp: '5:45', text: 'Important: Consensus mechanisms' }
        ]
      },
      {
        id: 2,
        title: 'Understanding Cryptography',
        duration: '20:15',
        completed: true,
        type: 'video',
        description: 'Explore cryptographic principles used in blockchain.',
        notes: []
      },
      {
        id: 3,
        title: 'Smart Contracts Basics',
        duration: '25:45',
        completed: false,
        type: 'video',
        description: 'Introduction to smart contracts and their implementation.',
        notes: []
      },
      {
        id: 4,
        title: 'Hands-on Exercise: Your First Smart Contract',
        duration: '30:00',
        completed: false,
        type: 'exercise',
        description: 'Practical exercise to create and deploy a smart contract.',
        notes: []
      }
    ] as Lesson[],
    resources: [
      {
        id: 1,
        title: 'Course Slides',
        type: 'pdf',
        size: '2.5 MB'
      },
      {
        id: 2,
        title: 'Reference Materials',
        type: 'pdf',
        size: '1.8 MB'
      },
      {
        id: 3,
        title: 'Code Examples',
        type: 'zip',
        size: '4.2 MB'
      }
    ] as Resource[],
    discussions: [
      {
        id: 1,
        user: 'Alice Johnson',
        avatar: 'https://via.placeholder.com/40',
        timestamp: '2 hours ago',
        content: 'Can someone explain the difference between public and private blockchains?',
        replies: 5,
        likes: 12
      },
      {
        id: 2,
        user: 'Bob Smith',
        avatar: 'https://via.placeholder.com/40',
        timestamp: '1 day ago',
        content: 'I found this resource helpful for understanding consensus mechanisms: [link]',
        replies: 3,
        likes: 8
      }
    ] as Discussion[]
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        timestamp: 'Current time',
        text: noteText
      };
      course.lessons[currentLesson].notes.push(newNote);
      setNoteText('');
    }
  };

  return (
    <div className="course-player">
      <div className="container">
        <div className="player-header">
          <div className="course-info">
            <h1>{course.title}</h1>
            <div className="course-meta">
              <span>⭐ {course.rating}</span>
              <span>👥 {course.enrolled.toLocaleString()} enrolled</span>
              <span>🔄 Updated {course.lastUpdated}</span>
            </div>
          </div>
          <div className="player-actions">
            <button className="btn btn-secondary">
              Download Resources
            </button>
            <Link to="/dashboard" className="btn btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="player-content">
          <div className="video-section">
            <div className="video-container">
              <div className="video-placeholder">
                <h2>Lesson: {course.lessons[currentLesson].title}</h2>
                <p>{course.lessons[currentLesson].description}</p>
              </div>
            </div>

            <div className="video-controls">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
                <span>12:30 / 25:45</span>
              </div>
              <div className="control-buttons">
                <button className="btn btn-icon">⏮️</button>
                <button className="btn btn-icon">⏯️</button>
                <button className="btn btn-icon">⏭️</button>
                <button className="btn btn-icon">🔊</button>
                <button className="btn btn-icon">📺</button>
                <button 
                  className="btn btn-icon" 
                  onClick={() => setShowNotes(!showNotes)}
                >
                  📝
                </button>
              </div>
            </div>

            {showNotes && (
              <div className="notes-section">
                <h3>Notes</h3>
                <div className="notes-list">
                  {course.lessons[currentLesson].notes.map(note => (
                    <div key={note.id} className="note-item">
                      <span className="note-timestamp">{note.timestamp}</span>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
                <div className="add-note">
                  <textarea
                    placeholder="Add a note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
                  <button className="btn btn-primary" onClick={handleAddNote}>
                    Add Note
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="sidebar">
            <div className="sidebar-tabs">
              <button
                className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                Course Content
              </button>
              <button
                className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              <button
                className={`tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
                onClick={() => setActiveTab('discussions')}
              >
                Discussions
              </button>
            </div>

            <div className="sidebar-content">
              {activeTab === 'content' && (
                <div className="lessons-list">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`lesson-item ${index === currentLesson ? 'active' : ''} ${lesson.completed ? 'completed' : ''}`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="lesson-info">
                        <span className="lesson-type">{lesson.type === 'video' ? '▶️' : '💻'}</span>
                        <div>
                          <h4>{lesson.title}</h4>
                          <p>{lesson.duration}</p>
                        </div>
                      </div>
                      {lesson.completed && <span className="completed-badge">✓</span>}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="resources-list">
                  {course.resources.map(resource => (
                    <div key={resource.id} className="resource-item">
                      <span className="resource-type">
                        {resource.type === 'pdf' ? '📄' : '📦'}
                      </span>
                      <div className="resource-info">
                        <h4>{resource.title}</h4>
                        <p>{resource.size}</p>
                      </div>
                      <button className="btn btn-icon">⬇️</button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'discussions' && (
                <div className="discussions-list">
                  <div className="new-discussion">
                    <textarea placeholder="Start a new discussion..."></textarea>
                    <button className="btn btn-primary">Post</button>
                  </div>
                  {course.discussions.map(discussion => (
                    <div key={discussion.id} className="discussion-item">
                      <div className="discussion-header">
                        <img src={discussion.avatar} alt={discussion.user} />
                        <div>
                          <h4>{discussion.user}</h4>
                          <p>{discussion.timestamp}</p>
                        </div>
                      </div>
                      <p className="discussion-content">{discussion.content}</p>
                      <div className="discussion-actions">
                        <button className="btn btn-icon">💬 {discussion.replies}</button>
                        <button className="btn btn-icon">👍 {discussion.likes}</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer; 