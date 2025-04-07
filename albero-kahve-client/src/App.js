// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';

// Ana bileşenler
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Sayfalar
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CoffeePage from './pages/CoffeePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Tema tanımı
const theme = {
  colors: {
    primary: '#9C7C38',    // Kahve/altın tonu
    secondary: '#3D2E1D',  // Koyu kahve
    dark: '#1a1a1a',       // Siyaha yakın
    light: '#F5F5F5',      // Açık gri
    white: '#FFFFFF',
    text: '#333333',
    textLight: '#777777'
  },
  fonts: {
    main: "'Open Sans', sans-serif",
    heading: "'Playfair Display', serif"
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    largeDesktop: '1200px'
  }
};



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/kahve/:category" element={<CoffeePage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;



