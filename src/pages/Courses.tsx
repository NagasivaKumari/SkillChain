import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  category: string;
  image: string;
}

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Only the two YouTube courses
  const courses: Course[] = [
    {
      id: 'V6Yqr7prI2I',
      title: 'Algorand Blockchain Tutorial',
      instructor: 'Algorand Expert',
      rating: 4.7,
      students: 1200,
      category: 'Development',
      image: ''
    },
    {
      id: 'fLAfa-BQtOQ',
      title: 'Blockchain Basics',
      instructor: 'Blockchain Guru',
      rating: 4.5,
      students: 950,
      category: 'Development',
      image: ''
    }
  ];

  const categories = ['all', 'Development'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Explore Courses</h1>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ flex: 1 }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
              style={{ width: '200px' }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-2">
          {filteredCourses.map(course => (
            <div key={course.id} className="card">
              <div style={{ height: '200px', backgroundColor: '#eee' }}></div>
              <div style={{ padding: '1.5rem' }}>
                <h3>{course.title}</h3>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>{course.instructor}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{ color: '#f7c32e' }}>★</span>
                  <span>{course.rating}</span>
                  <span style={{ color: '#666' }}>({course.students} students)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <Link to={`/courses/${course.id}`} className="btn btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>No courses found</h3>
            <p style={{ color: '#666' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 