import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
const Dashboard = () => <div>Dashboard (placeholder)</div>;
const NotFound = () => <div>404 Not Found (placeholder)</div>;
const CourseList = () => <div>Course List (placeholder)</div>;
const CoursePlayer = () => <div>Course Player (placeholder)</div>;
const Exam = () => <div>Exam (placeholder)</div>;
const ClaimCertificate = () => <div>Claim Certificate (placeholder)</div>;
const CertificateList = () => <div>Certificate List (placeholder)</div>;

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/:id" element={<CoursePlayer />} />
      <Route path="/exam/:courseId" element={<Exam />} />
      <Route path="/claim-certificate/:courseId" element={<ClaimCertificate />} />
      <Route path="/certificates" element={<CertificateList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;