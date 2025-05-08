import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlgorandProvider } from './contexts/AlgorandContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <AlgorandProvider>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AlgorandProvider>
    </Router>
  );
}

export default App; 