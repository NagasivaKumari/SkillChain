import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
// import { useAlgorand } from '../contexts/AlgorandContext'; // Uncomment for Algorand integration

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  youtubeId: string;
  curriculum: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: string;
    }[];
  }[];
  quiz: {
    question: string;
    options: string[];
    answer: number;
  };
  exam: {
    question: string;
    options: string[];
    answer: number;
  };
}

interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  date: string;
  verified: boolean;
}

const userName = 'Nagasiva'; // Replace with profile name if available

// Simulate progress: in a real app, get this from user data
const getCourseProgress = (courseId: string) => {
  if (courseId === 'V6Yqr7prI2I') return 100; // completed
  if (courseId === 'fLAfa-BQtOQ') return 30; // not completed
  return 0;
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course] = useState<Course | null>({
    id: id || '',
    title: 'Algorand Blockchain Tutorial',
    description: 'A practical guide to building on Algorand.',
    instructor: 'Algorand Expert',
    duration: '4 hours',
    level: 'Intermediate',
    price: 49.99,
    rating: 4.5,
    students: 1234,
    image: '/course1.jpg',
    youtubeId: id || '',
    curriculum: [],
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
    exam: {
      question: 'What is the main advantage of Pure Proof of Stake in Algorand?',
      options: [
        'High energy consumption',
        'No need for mining',
        'Centralized control',
        'Requires special hardware',
      ],
      answer: 1,
    },
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [examSelected, setExamSelected] = useState<number | null>(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examPassed, setExamPassed] = useState(false);
  const [certificateClaimed, setCertificateClaimed] = useState(false);
  const progress = id ? getCourseProgress(id) : 0;

  if (!course) {
    return (
      <div className="section">
        <div className="container">
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Quiz logic
  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (quizSelected === course.quiz.answer) {
      setQuizPassed(true);
    }
  };

  // Exam logic
  const handleExamSubmit = () => {
    setExamSubmitted(true);
    if (examSelected === course.exam.answer) {
      setExamPassed(true);
    }
  };

  const handleClaimCertificate = () => {
    setCertificateClaimed(true);
    // Store certificate in localStorage (for demo/testing)
    // --- For Algorand integration, replace this block with blockchain transaction logic ---
    const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
    certs.push({
      courseId: course.id,
      courseTitle: course.title,
      userName,
      date: new Date().toLocaleDateString(),
    });
    localStorage.setItem('certificates', JSON.stringify(certs));
    // --- End localStorage block ---
    handleDownloadCertificate(); // Automatically generate and download certificate
  };

  const handleDownloadCertificate = () => {
    if (!course) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 277, 190);

    // Add logo
    doc.addImage('/logo.png', 'PNG', 20, 20, 40, 40);

    // Add title
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text('Certificate of Completion', 148.5, 40, { align: 'center' });

    // Add decorative line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(50, 50, 247, 50);

    // Add certificate text
    doc.setFontSize(16);
    doc.text('This is to certify that', 148.5, 70, { align: 'center' });

    // Add student name
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(userName, 148.5, 85, { align: 'center' });

    // Add course completion text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', 148.5, 100, { align: 'center' });

    // Add course name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(course.title, 148.5, 115, { align: 'center' });

    // Add date
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Issued on: ${date}`, 148.5, 130, { align: 'center' });

    // Add verification text
    doc.setFontSize(12);
    const certificateId = Math.random().toString(36).substr(2, 9);
    doc.text('Certificate ID: ' + certificateId, 148.5, 145, { align: 'center' });
    doc.text('Verify at: www.skillchain.com/verify', 148.5, 155, { align: 'center' });

    // Add signature line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(50, 170, 100, 170);
    doc.text('Instructor', 75, 180, { align: 'center' });

    // Save the PDF
    doc.save('certificate.pdf');

    // Store certificate in localStorage
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    const newCertificate: Certificate = {
      id: certificateId,
      courseId: course.id,
      courseTitle: course.title,
      studentName: userName,
      date: new Date().toISOString(),
      verified: true
    };
    certificates.push(newCertificate);
    localStorage.setItem('certificates', JSON.stringify(certificates));
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">{course.title}</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{course.description}</p>
        <div style={{ marginBottom: '2rem' }}>
          <iframe
            width="700"
            height="400"
            src={`https://www.youtube.com/embed/${course.youtubeId}`}
            title={course.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', maxWidth: 700 }}
          ></iframe>
        </div>
        <div style={{ marginBottom: '1rem' }}><b>Instructor:</b> {course.instructor}</div>
        <div style={{ marginBottom: '1rem' }}><b>Progress:</b> {progress}%</div>

        {/* Quiz Section (Practice Only) */}
        <div style={{ margin: '2rem 0', maxWidth: 600 }}>
          <h3>Practice Quiz</h3>
          <p><b>{course.quiz.question}</b></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {course.quiz.options.map((opt, idx) => (
              <label key={idx} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="quiz"
                  value={idx}
                  checked={quizSelected === idx}
                  onChange={() => setQuizSelected(idx)}
                  disabled={quizSubmitted}
                />{' '}
                {opt}
              </label>
            ))}
          </div>
          {!quizSubmitted && (
            <button
              style={{ marginTop: '1rem', background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }}
              onClick={handleQuizSubmit}
              disabled={quizSelected === null}
            >
              Submit
            </button>
          )}
          {quizSubmitted && quizPassed && (
            <div style={{ color: 'green', marginTop: '1rem' }}>
              Correct! You passed the practice quiz.
            </div>
          )}
          {quizSubmitted && !quizPassed && (
            <div style={{ color: 'red', marginTop: '1rem' }}>
              Incorrect answer. Please review the course and try again.
            </div>
          )}
        </div>

        {/* Exam Section (Certificate Only After Passing) */}
        {progress === 100 ? (
          <div style={{ margin: '2rem 0', maxWidth: 600 }}>
            <h3>Final Exam</h3>
            <p><b>{course.exam.question}</b></p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {course.exam.options.map((opt, idx) => (
                <label key={idx} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="exam"
                    value={idx}
                    checked={examSelected === idx}
                    onChange={() => setExamSelected(idx)}
                    disabled={examSubmitted}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
            {!examSubmitted && (
              <button
                style={{ marginTop: '1rem', background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }}
                onClick={handleExamSubmit}
                disabled={examSelected === null}
              >
                Submit Exam
              </button>
            )}
            {examSubmitted && examPassed && !certificateClaimed && (
              <div style={{ color: 'green', marginTop: '1rem' }}>
                Congratulations! You passed the exam.<br />
                <button style={{ marginTop: '1rem', background: '#28a745', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }} onClick={handleClaimCertificate}>
                  Claim Certificate
                </button>
              </div>
            )}
            {examSubmitted && examPassed && certificateClaimed && (
              <div style={{ color: 'blue', marginTop: '1rem' }}>
                🎉 Certificate claimed! Congratulations!<br />
                <button style={{ marginTop: '1rem', background: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4 }} onClick={handleDownloadCertificate}>
                  Download Certificate
                </button>
              </div>
            )}
            {examSubmitted && !examPassed && (
              <div style={{ color: 'red', marginTop: '1rem' }}>
                Incorrect answer. Please review the course and try again.
              </div>
            )}
          </div>
        ) : (
          <div style={{ margin: '2rem 0', maxWidth: 600, color: '#888', fontWeight: 500 }}>
            <h3>Final Exam</h3>
            <p>You must complete the course to unlock the final exam and certificate.</p>
          </div>
        )}

        <div className="grid grid-2" style={{ gap: '3rem' }}>
          {/* Main Content */}
          <div>
            {/* Tabs */}
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '2rem'
            }}>
              {['overview', 'curriculum', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '1rem 2rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : 'none',
                    color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-color)'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>About This Course</h2>
                <p style={{ lineHeight: '1.6', color: '#666' }}>{course.description}</p>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Course Content</h2>
                {/* Add curriculum content here */}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Student Reviews</h2>
                <p>Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
export {}; 