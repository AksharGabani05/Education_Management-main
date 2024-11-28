// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CourseProvider } from './context/CourseContext'; // CourseProvider को import करें
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DataProvider>
          <CourseProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/student/*" 
                  element={
                    <PrivateRoute>
                      <StudentDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/teacher/*" 
                  element={
                    <PrivateRoute>
                      <TeacherDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </CourseProvider>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;