import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CourseListPage from './pages/CourseListPage';
import MyCoursesPage from './pages/MyCoursesPage';
import CreateCoursePage from './pages/CreateCoursePage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

const AppRouter = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        
        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route 
              path="/dashboard" 
              element={role === 'ADMIN' ? <AdminDashboard /> : 
                      role === 'INSTRUCTOR' ? <InstructorDashboard /> : 
                      <StudentDashboard />} 
            />
            <Route path="/admin/*" element={role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
            <Route path="/instructor/*" element={role === 'INSTRUCTOR' ? <InstructorDashboard /> : <Navigate to="/dashboard" />} />
            <Route path="/student/*" element={role === 'STUDENT' ? <StudentDashboard /> : <Navigate to="/dashboard" />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/instructor/courses" element={<InstructorDashboard />} />
            <Route path="/instructor/courses/new" element={<CreateCoursePage />} />
          </>
        )}
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
