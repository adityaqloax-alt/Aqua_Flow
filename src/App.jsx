import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import SidebarLayout from './components/common/layout/SidebarLayout';

// --- Protected Route Component ---
// This checks if the user is logged in before letting them see the app
const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole) {
    // If no role found, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        {/* Everything starting with /app/... goes here */}
        <Route 
          path="/app/*" 
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
