import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAlgorand } from '../contexts/AlgorandContext';
import { jsPDF } from 'jspdf';

interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  date: string;
  verified: boolean;
}

interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
}

const Dashboard: React.FC = () => {
  const { account } = useAlgorand();
  const [activeTab, setActiveTab] = useState('enrolled');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enrolledCourses] = useState<EnrolledCourse[]>([
    {
      id: 'V6Yqr7prI2I',
      title: 'Algorand Blockchain Tutorial',
      progress: 100, // completed for demo
      lastAccessed: '2 days ago',
    },
    {
      id: 'fLAfa-BQtOQ',
      title: 'Blockchain Basics',
      progress: 30,
      lastAccessed: '1 day ago',
    }
  ]);

  useEffect(() => {
    // Load certificates from localStorage
    const storedCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(storedCertificates);
  }, []);

  const handleDownloadCertificate = (certificate: Certificate) => {
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
    doc.text(certificate.studentName, 148.5, 85, { align: 'center' });

    // Add course completion text
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', 148.5, 100, { align: 'center' });

    // Add course name
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.courseTitle, 148.5, 115, { align: 'center' });

    // Add date
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const date = new Date(certificate.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Issued on: ${date}`, 148.5, 130, { align: 'center' });

    // Add verification text
    doc.setFontSize(12);
    doc.text('Certificate ID: ' + certificate.id, 148.5, 145, { align: 'center' });
    doc.text('Verify at: www.skillchain.com/verify', 148.5, 155, { align: 'center' });

    // Add signature line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(50, 170, 100, 170);
    doc.text('Instructor', 75, 180, { align: 'center' });

    // Save the PDF
    doc.save(`${certificate.courseTitle}-certificate.pdf`);
  };

  if (!account) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Please sign in to view your dashboard</h2>
            <Link to="/signin" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
          {[
            { label: 'Enrolled Courses', value: enrolledCourses.length },
            { label: 'Completed Courses', value: enrolledCourses.filter(c => c.progress === 100).length },
            { label: 'Certificates', value: certificates.length },
            { label: 'Learning Hours', value: '12.5' }
          ].map((stat, index) => (
            <div key={index} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h3>
              <p style={{ color: '#666' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2rem'
        }}>
          {['enrolled', 'certificates', 'achievements'].map(tab => (
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
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'enrolled' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>My Courses</h2>
            <div className="grid grid-2">
              {enrolledCourses.map(course => (
                <div key={course.id} className="card">
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>{course.title}</h3>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: 'var(--light-gray)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          backgroundColor: 'var(--primary-color)'
                        }}></div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      color: '#666',
                      marginBottom: '1rem'
                    }}>
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>My Certificates</h2>
            {certificates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No certificates yet. Complete courses to earn certificates!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 600, margin: '0 auto' }}>
                {certificates.map((cert, idx) => (
                  <div key={idx} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div><b>Course:</b> {cert.courseTitle}</div>
                    <div><b>Name:</b> {cert.studentName}</div>
                    <div><b>Date:</b> {cert.date}</div>
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '1rem' }}
                      onClick={() => handleDownloadCertificate(cert)}
                    >
                      Download Certificate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>My Achievements</h2>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Start learning to earn achievements!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 