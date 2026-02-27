import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <ContactContainer>
      <Title>Contact Me</Title>
      <Subtitle>
        Hi, I'm Cheston Opsasnick, a passionate software engineer with expertise in
        full-stack development, machine learning, and building innovative solutions.
      </Subtitle>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
  background: linear-gradient(rgba(12, 3, 51, 0.3), rgba(12, 3, 51, 0.5));
  color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
`;

export default Contact;