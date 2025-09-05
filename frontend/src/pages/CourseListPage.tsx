import React, { useState, useEffect } from 'react';
import api from '../api/api';
import CourseCard from '../components/CourseCard';
import { Course } from '../types';

const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      // Update UI or show success message
    } catch (err) {
      setError('Failed to enroll in course');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onEnroll={handleEnroll} 
          />
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
