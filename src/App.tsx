import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// App Pages
import DashboardPage from './pages/app/DashboardPage';
import EmissionsInputPage from './pages/app/EmissionsInputPage';
import LeaderboardPage from './pages/app/LeaderboardPage';
import AchievementsPage from './pages/app/AchievementsPage';
import ProfilePage from './pages/app/ProfilePage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-leaf-sway text-primary-500">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 6H9L12 2Z" fill="currentColor" />
          <path d="M20 12L16 9V15L20 12Z" fill="currentColor" />
          <path d="M4 12L8 15V9L4 12Z" fill="currentColor" />
          <path d="M12 22L9 18H15L12 22Z" fill="currentColor" />
          <path d="M12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7Z" fill="currentColor" />
        </svg>
      </div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
        } />
        <Route path="/register" element={
          !isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />
        } />
      </Route>
      
      {/* App Routes */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/emissions" element={<EmissionsInputPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      
      {/* Redirect root to dashboard or login */}
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;