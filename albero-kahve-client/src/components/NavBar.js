import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiSearch, FiUser } from 'react-icons/fi';
import styled from 'styled-components';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedMenus({});
  };

  return (
    <NavContainer>
      <NavWrapper>
        <LeftSection>
          <NavExtraIcons>
            <IconButton>
              <FiSearch />
            </IconButton>
          </NavExtraIcons>
        </LeftSection>

        <CenterSection>
          <Logo>
            <Link to="/" onClick={closeMenu}>N1 KAHVE</Link>
          </Logo>
        </CenterSection>

        <RightSection>
          <NavExtraIcons>
            <IconButton>
              <FiUser />
            </IconButton>
          </NavExtraIcons>
        </RightSection>

        <MenuButton onClick={toggleMenu}>
          <FiMenu />
        </MenuButton>
      </NavWrapper>

      <NavLinks $isOpen={isOpen}>
        <NavItem>
          <Link to="/" onClick={closeMenu}>ANA SAYFA</Link>
        </NavItem>
        
        <NavItem>
          <SubmenuHeader onClick={() => toggleSubMenu('duzenleme')}>
            <span>DÜZENLEYİCİLERİ AÇ</span>
            <FiChevronDown className={expandedMenus.duzenleme ? 'rotated' : ''} />
          </SubmenuHeader>
          <Submenu $isOpen={expandedMenus.duzenleme}>
            <SubmenuItem>
              <Link to="/duzenleme/slider" onClick={closeMenu}>Slider Düzenle</Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to="/duzenleme/menu" onClick={closeMenu}>Menü Düzenle</Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to="/duzenleme/iletisim" onClick={closeMenu}>İletişim Düzenle</Link>
            </SubmenuItem>
          </Submenu>
        </NavItem>

        <NavItem>
          <SubmenuHeader onClick={() => toggleSubMenu('kahve')}>
            <span>N1KAHVE</span>
            <FiChevronDown className={expandedMenus.kahve ? 'rotated' : ''} />
          </SubmenuHeader>
          <Submenu $isOpen={expandedMenus.kahve}>
            <SubmenuItem>
              <Link to="/kahve/filtre" onClick={closeMenu}>Filtre Kahve</Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to="/kahve/espresso" onClick={closeMenu}>Espresso Bazlı</Link>
            </SubmenuItem>
            <SubmenuItem>
              <Link to="/kahve/turk" onClick={closeMenu}>Türk Kahvesi</Link>
            </SubmenuItem>
          </Submenu>
        </NavItem>

        <NavItem>
          <Link to="/hakkimizda" onClick={closeMenu}>HAKKIMIZDA</Link>
        </NavItem>
        
        <NavItem>
          <Link to="/iletisim" onClick={closeMenu}>İLETİŞİM</Link>
        </NavItem>
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background-color: ${props => props.theme.colors.dark};
  color: #fff;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const LeftSection = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CenterSection = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    transform: none;
  }
`;

const RightSection = styled.div`
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavExtraIcons = styled.div`
  display: none; /* Bu satırı ekleyerek ikonları gizleyebilirsiniz */
  gap: 1rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: row;
    justify-content: center;
  }
`;

const NavItem = styled.li`
  padding: 0;
  border-bottom: 1px solid #333;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    border-bottom: none;
    position: relative;
  }
  
  > a {
    display: block;
    padding: 1rem 2rem;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #333;
    }

    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      padding: 1rem 1rem;
    }
  }
`;

const SubmenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background-color: #333;
  }
  
  .rotated {
    transform: rotate(180deg);
  }
  
  svg {
    transition: transform 0.3s ease;
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 1rem 1rem;
  }
`;

const Submenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background-color: #252525;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: ${props => props.$isOpen ? 'block' : 'none'};
    max-height: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;

const SubmenuItem = styled.li`
  a {
    display: block;
    padding: 0.75rem 3rem;
    color: #ddd;
    text-decoration: none;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #333;
    }

    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      padding: 0.75rem 2rem;
    }
  }
`;

export default NavBar;