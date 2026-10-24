import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import {colors} from "/src/colors";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Client-side routing leaves the mobile drawer open over the new route;
  // full page loads used to tear it down for us.
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <Header>
        <LogoLink to="/" onClick={closeMenu}>
          <Logo
            src="/minnesota.png"
            alt="logo"
          />
        </LogoLink>
        {/* <LogoLink href="#">
          <Logo
            src="/10-101017_nhl-clipart-removebg-preview.png"
            alt="sharks logo"
          />
        </LogoLink>
        <LogoLink href="#">
          <Logo
            src="/bosox.png"
            alt="red sox logo"
          />
        </LogoLink>
        <LogoLink href="#">
          <Logo
            src="/San_Francisco_49ers_logo.svg.png"
            alt="49ers logo"
          />
        </LogoLink> */}
        <IconsLabel onClick={toggleMenu}>
          <Hamburger>
            <img src="/hamburger-menu-mobile-svgrepo-com.svg" alt="menu" width="30" height="30" />
          </Hamburger>
          {isOpen ? (
            <i className="bx bx-x" id="close-icon"></i>
          ) : (
            <i className="bx bx-menu" id="menu-icon"></i>
          )}
        </IconsLabel>
        {/* {isOpen && (
          <CloseIcon onClick={toggleMenu}>
            <i className="bx bx-x"></i>
          </CloseIcon>
        )} */}
        
        <Navbar $isOpen={isOpen}>
          <NavItem to="/" $isOpen={isOpen} style={{ "--i": 0 }} onClick={closeMenu}>
            Home
          </NavItem>
          <NavItem to="/profile" $isOpen={isOpen} style={{ "--i": 1 }} onClick={closeMenu}>
            Profile
          </NavItem>
          <NavItem to="/projects" $isOpen={isOpen} style={{ "--i": 2 }} onClick={closeMenu}>
            Projects
          </NavItem>
          <NavItem to="/blog" $isOpen={isOpen} style={{ "--i": 3 }} onClick={closeMenu}>
            Blog
          </NavItem>
          <NavItem to="/contact" $isOpen={isOpen} style={{ "--i": 4 }} onClick={closeMenu}>
            Contact
          </NavItem>
        </Navbar>
      </Header>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: "Poppins", sans-serif;
    background: linear-gradient(rgba(12, 3, 51, 0.3), rgba(12, 3, 51, 0.5));
    background-repeat: no-repeat;
    min-height: 100vh;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  background: ${colors.teal};
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
`;

const LogoLink = styled(Link)``;
const Logo = styled.img`
  width: 40px;
`;

const IconsLabel = styled.label`
  position: absolute;
  right: 5%;
  font-size: 2.3rem;
  color: #fff;
  cursor: pointer;
  display: none;
  @media (max-width: 700px) {
    display: inline-flex;
  }
`;

const Navbar = styled.nav`
  display: flex;
  @media (max-width: 700px) {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    /* 5 items at ~4rem each; overflow is hidden, so a short drawer clips
       the last link entirely. */
    height: ${({ $isOpen }) => ($isOpen ? "20rem" : "0")};
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: height 0.3s ease;
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled(Link)`
  position: relative;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: -0.13px;
  text-decoration: none;
  margin-left: 2.5rem;
  transition: all 0.5s ease;
  @media (max-width: 700px) {
    font-size: 1.1rem;
    margin: 2rem 0;
    text-align: center;
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-50px)")};
    transition: all 0.3s ease;
  }
  &:hover {
    color: rgba(168, 239, 255, 0.9);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    left: 50%;
    width: 0;
    height: 0.15rem;
    transform: translateX(-50%);
    background-color: rgba(168, 239, 255, 0.9);
    transition: all 0.5s ease;
  }
  &:hover:after {
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.4rem;
  &:hover {
    background: rgba(150, 150, 150, 0.18);
    border-radius: 50%;
  }
`;
export default NavBar;