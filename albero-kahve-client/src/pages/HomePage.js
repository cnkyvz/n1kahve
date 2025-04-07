// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Bileşenler
import HeroSlider from '../components/HeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InstagramFeed from '../components/InstagramFeed';

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      
      <section className="section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Kaliteli Kahvenin Adresi
          </motion.h2>
          
          <IntroText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Albero Kahve, en kaliteli çekirdeklerden özenle hazırlanan kahveleri ve sıcak atmosferiyle sizi
            bekliyor. Özel kavrulan çekirdeklerimiz, uzman baristalarımız ve kendine özgü lezzetlerimiz ile
            kahve keyfini en üst düzeye çıkarıyoruz.
          </IntroText>
          
          <ButtonGroup>
            <StyledLink to="/kahve/filtre" className="btn btn-primary">
              Kahvelerimizi Keşfedin
            </StyledLink>
            
            <StyledLink to="/hakkimizda" className="btn btn-secondary">
              Hikayemiz
            </StyledLink>
          </ButtonGroup>
        </div>
      </section>
      
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <InstagramFeed />
    </>
  );
};

// Styled Components
const IntroText = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export default HomePage;