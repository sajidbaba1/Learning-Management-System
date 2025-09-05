import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const InstructorDashboard = () => {
  const { username, role } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome, {username} ({role})</p>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <p className="text-center mt-40 text-gray-500">Instructor content goes here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
