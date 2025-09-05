import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Instructor: {course.instructor?.username || 'TBD'}</span>
          {onEnroll && (
            <button
              onClick={() => onEnroll(course.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
