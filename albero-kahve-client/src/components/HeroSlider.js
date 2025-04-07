// src/components/HeroSlider.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// CSS dosyalarını import et
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: '/images/slider/slide1.jpg',
      title: 'En Kaliteli Kahve Çekirdekleri',
      description: 'Dünyanın dört bir yanından özenle seçilmiş kahve çekirdekleri',
      buttonText: 'Keşfet',
      buttonLink: '/kahve/filtre'
    },
    {
      id: 2,
      image: '/images/slider/slide2.jpg',
      title: 'Uzman Barista Ekibi',
      description: 'Kahve tutkunları tarafından hazırlanan enfes lezzetler',
      buttonText: 'Menümüz',
      buttonLink: '/kahve/espresso'
    },
    {
      id: 3,
      image: '/images/slider/slide3.jpg',
      title: 'Özel Kavurma Tekniği',
      description: 'Her çekirdeğin karakterini ortaya çıkaran kavurma işlemi',
      buttonText: 'Daha Fazla',
      buttonLink: '/hakkimizda'
    }
  ]);

  // API'den slider verilerini çek (eğer varsa)
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('/api/slider');
        
        // HATALI veri varsa set etme
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSlides(response.data);
        } else {
          console.warn('Beklenen array formatı alınamadı. Gelen veri:', response.data);
        }
  
      } catch (error) {
        console.error('Slider verilerini çekerken hata oluştu:', error);
      }
    };
  
    fetchSlides();
  }, []);
  

  // Slider ayarları
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {slides.map((slide) => (
          <SliderItem key={slide.id}>
            <SliderImage style={{ backgroundImage: `url(${slide.image})` }}>
              <SliderOverlay />
              <SliderContent>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <SliderButton to={slide.buttonLink}>
                    {slide.buttonText}
                  </SliderButton>
                </motion.div>
              </SliderContent>
            </SliderImage>
          </SliderItem>
        ))}
      </StyledSlider>
    </SliderContainer>
  );
};

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  margin-top: -1px; /* NavBar ile birleşmesi için */
`;

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 30px;
    
    li button:before {
      color: white;
      opacity: 0.5;
      font-size: 12px;
    }
    
    li.slick-active button:before {
      color: ${props => props.theme.colors.primary};
      opacity: 1;
    }
  }
  
  .slick-prev, .slick-next {
    z-index: 100;
    width: 50px;
    height: 50px;
    
    &:before {
      font-size: 30px;
    }
  }
  
  .slick-prev {
    left: 20px;
  }
  
  .slick-next {
    right: 20px;
  }
`;

const SliderItem = styled.div`
  position: relative;
`;

const SliderImage = styled.div`
  height: 90vh;
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 70vh;
  }
`;

const SliderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const SliderContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;
  max-width: 800px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      font-size: 1.2rem;
    }
  }
`;

const SliderButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

export default HeroSlider;



