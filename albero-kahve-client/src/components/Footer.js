// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterTitle>N1 Kahve</FooterTitle>
            <FooterText>
              En kaliteli kahve deneyimi için doğru adres. Özenle seçilen çekirdekler ve uzman baristalar ile hizmetinizdeyiz.
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Bağlantılar</FooterTitle>
            <FooterLinks>
              <FooterLink to="/">Ana Sayfa</FooterLink>
              <FooterLink to="/hakkimizda">Hakkımızda</FooterLink>
              <FooterLink to="/kahve/filtre">Kahvelerimiz</FooterLink>
              <FooterLink to="/iletisim">İletişim</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>İletişim</FooterTitle>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt />
                <span>Zafer mah. Adile Naşit blv. No:37/1A No:31
                Esenyurt/Istanbul, Turkey</span>
              </ContactItem>
              <ContactItem>
                <FaPhone />
                <span>+90 530 405 64 66</span>
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                <span>info@n1kahve.com</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} N1 Kahve. Tüm hakları saklıdır.</p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

// Styled Components
const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  padding: 4rem 0 0;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const FooterText = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #aaa;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled(Link)`
  margin-bottom: 1rem;
  color: #aaa;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &:before {
    content: '→ ';
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
  
  svg {
    margin-right: 1rem;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    color: #aaa;
    font-size: 0.9rem;
  }
`;

export default Footer;