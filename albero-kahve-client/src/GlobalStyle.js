// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    color: #333333;
    line-height: 1.6;
    background-color: #F5F5F5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    margin-bottom: 1rem;
    color: #3D2E1D;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }
  
  main {
    min-height: calc(100vh - 200px);
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
  }
  
  .section {
    padding: 4rem 0;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    position: relative;
    
    &:after {
      content: '';
      display: block;
      width: 80px;
      height: 3px;
      background-color: #9C7C38;
      margin: 0.5rem auto 0;
    }
  }
  
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    
    &-primary {
      background-color: #9C7C38;
      color: white;
      
      &:hover {
        background-color: #8A6D2F;
        transform: translateY(-2px);
      }
    }
    
    &-secondary {
      background-color: transparent;
      border: 2px solid #9C7C38;
      color: #9C7C38;
      
      &:hover {
        background-color: #9C7C38;
        color: white;
      }
    }
  }
  
  // Form elementleri için stil
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #9C7C38;
    }
  }
  
  // Mobil için duyarlı tasarım
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    .section {
      padding: 2rem 0;
    }
  }
`;

export default GlobalStyle;