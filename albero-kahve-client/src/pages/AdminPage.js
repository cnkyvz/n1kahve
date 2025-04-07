// src/pages/AdminPage.js - Yönetim paneli için ana sayfa
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Admin Panel Alt Bileşenleri
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminSliders from '../components/admin/AdminSliders';
import AdminMenu from '../components/admin/AdminMenu';
import AdminContact from '../components/admin/AdminContact';
import AdminLogin from '../components/admin/AdminLogin';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcının oturum durumunu kontrol et
    const checkAuth = async () => {
      const token = localStorage.getItem('auth-token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        navigate('/admin/login');
        return;
      }
      
      try {
        // Token geçerliliğini kontrol et
        const response = await axios.get('/api/users/verify', {
          headers: { 'x-auth-token': token }
        });
        
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('auth-token');
          setIsAuthenticated(false);
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Oturum doğrulama hatası:', error);
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
        navigate('/admin/login');
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = (token) => {
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  if (loading) {
    return <LoadingScreen>Yükleniyor...</LoadingScreen>;
  }

  return (
    <AdminContainer>
      <Routes>
        <Route 
          path="login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin/dashboard" /> : 
            <AdminLogin onLogin={handleLogin} />
          } 
        />
        
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <AdminLayout>
                <AdminSidebar onLogout={handleLogout} />
                <AdminContent>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="sliders" element={<AdminSliders />} />
                    <Route path="menu" element={<AdminMenu />} />
                    <Route path="contact" element={<AdminContact />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                  </Routes>
                </AdminContent>
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </AdminContainer>
  );
};

// Styled Components
const AdminContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const AdminLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AdminContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  background-color: #f5f5f5;
`;

export default AdminPage;