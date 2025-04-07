// src/components/AboutSection.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <AboutContainer className="section">
      <div className="container">
        <AboutGrid>
          <AboutImage
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/images/about/coffee-shop.jpg" alt="N1 Kahve" />
          </AboutImage>
          
          <AboutContent
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>Hikayemiz</h2>
            <p>
              2015 yılında kahve tutkunları tarafından kurulan N1 Kahve, 
              en kaliteli kahve çekirdeklerini dünyanın dört bir yanından tedarik ederek, 
              özenle kavurup müşterilerimize sunuyoruz.
            </p>
            <p>
              Kahve konusundaki tutkumuz ve uzmanlığımız, her fincan kahveye yansıyor. 
              Sürdürülebilir kaynaklardan tedarik ettiğimiz kahve çekirdeklerimiz ile 
              hem çevreye duyarlı hem de lezzetten ödün vermeyen bir deneyim sunuyoruz.
            </p>
            <p>
              N1 Kahve'de amacımız sadece kahve satmak değil, sizlere unutulmaz bir 
              kahve deneyimi yaşatmak ve kahve kültürünü yaygınlaştırmak.
            </p>
            <AboutLink to="/hakkimizda">
              Daha fazla bilgi için tıklayın
            </AboutLink>
          </AboutContent>
        </AboutGrid>
      </div>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.section`
  background-color: ${props => props.theme.colors.white};
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutImage = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const AboutContent = styled(motion.div)`
  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.secondary};
    position: relative;
    
    &:after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background-color: ${props => props.theme.colors.primary};
      margin-top: 0.5rem;
    }
  }
  
  p {
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.textLight};
  }
`;

const AboutLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  position: relative;
  font-size: 1.1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

export default AboutSection;