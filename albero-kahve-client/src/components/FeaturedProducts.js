// src/components/ProductPortfolio.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaLink } from 'react-icons/fa';

const ProductPortfolio = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const products = [
    {
      id: 1,
      frontImage: '/images/products/sos-arka2.png',
      backImage: '/images/products/sos.png',
      detailLink: '/sos'
    },
    {
      id: 2,
      frontImage: '/images/products/surup-arka2.png',
      backImage: '/images/products/surup.png',
      detailLink: '/surup'
    },
    {
      id: 3,
      frontImage: '/images/products/pure-arka2.png',
      backImage: '/images/products/pure.png',
      detailLink: '/pure'
    }
  ];

  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <PortfolioContainer>
      <ProductGrid>
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.2, 
              duration: 0.5 
            }}
            onMouseEnter={() => handleMouseEnter(product.id)}
            onMouseLeave={handleMouseLeave}
          >
            <ProductWrapper>
              <ProductCard>
                <FrontImage 
                  src={product.frontImage} 
                  alt={product.name}
                  style={{ 
                    opacity: hoveredItem === product.id ? 0 : 1 
                  }}
                />
                <BackImage 
                  src={product.backImage} 
                  alt={`${product.name} Detay`}
                  style={{ 
                    opacity: hoveredItem === product.id ? 1 : 0 
                  }}
                />
                {/* Hover olmadığında üstte görünecek ikonlar */}
                <NormalIconContainer
                  initial={{ opacity: 1 }}
                  animate={{ 
                    opacity: hoveredItem === product.id ? 0 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconLink href={product.frontImage} target="_blank">
                    <FaSearch />
                  </IconLink>
                  <IconLink href={product.detailLink}>
                    <FaLink />
                  </IconLink>
                </NormalIconContainer>

                {/* Hover durumunda ortada görünecek ikonlar */}
                <HoverIconContainer
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredItem === product.id ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <IconLink href={product.backImage} target="_blank">
                    <FaSearch />
                  </IconLink>
                  <IconLink href={product.detailLink}>
                    <FaLink />
                  </IconLink>
                </HoverIconContainer>
              </ProductCard>
              <ProductName>{product.name}</ProductName>
            </ProductWrapper>
          </ProductItem>
        ))}
      </ProductGrid>
    </PortfolioContainer>
  );
};

const PortfolioContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductItem = styled(motion.li)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductCard = styled.div`
  position: relative;
  width: 100%;
  padding-top: 130%; // 1:1 aspect ratio
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FrontImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

const BackImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

const NormalIconContainer = styled(motion.div)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

const HoverIconContainer = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #c0ab6d;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a08c50;
    transform: scale(1.1);
  }

  svg {
    font-size: 16px;
  }
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: #333;
`;

export default ProductPortfolio;