import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import api from '../api/api';
import { Enrollment } from '../types';

const MyCoursesPage = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get(`/api/enrollments/student/${userId}`);
        setEnrollments(response.data);
      } catch (error) {
        console.error('Failed to fetch enrollments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{enrollment.course.title}</h3>
            <p className="text-gray-600 mt-2">{enrollment.course.description}</p>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">
                Status: <span className="text-blue-600">{enrollment.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;
