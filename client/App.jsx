import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import './App.css';

// Set axios base URL
axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Here you would typically fetch user data
    }
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route 
            path="/create" 
            element={isAuthenticated ? <CreateBlog /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!isAuthenticated ? <Signup onSignup={handleLogin} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
