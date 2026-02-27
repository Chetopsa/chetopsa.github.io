import React from "react";
import styled from "styled-components";
import Image from "/src/components/atoms/Image";

const Home = () => {
  return (
    <HomeContainer>
      <ContentContainer>
        {/* Image on the left */}
        <ImageContainer>
          <Image path="/head_shot.png" size="200px" radius="20%" />
        </ImageContainer>
        {/* Text content on the right */}
        <TextContainer>
          <Title>Hi, I'm Cheston Opsasnick</Title>
          <CurrentActivity>
            <strong>Currently:</strong> Pursuing a Master's in Computer Science at the University of Minnesota. <Image path="/minnesota.png" size="5%" />
          </CurrentActivity>
          <Description>
            I love building software that solves real-world problems. I have experience in full-stack development, machine learning, and systems programming.
          </Description>
        </TextContainer>
      </ContentContainer>

      {/* Skills Section */}
      {/* <SkillsSection>
        <SkillsTitle>Skills</SkillsTitle>
        <SkillsIcons>
          <Skill>
            <i className="fas fa-brain"></i>
            <SkillName>Machine Learning</SkillName>
          </Skill>
          <Skill>
            <i className="fas fa-code"></i>
            <SkillName>Software Development</SkillName>
          </Skill>
          <Skill>
            <i className="fas fa-cogs"></i>
            <SkillName>Systems Programming</SkillName>
          </Skill>
        </SkillsIcons>
      </SkillsSection> */}

      {/* Projects Section */}
      <ProjectsSection>
        <ProjectsTitle>Here Are Some of My Projects</ProjectsTitle>
        <ProjectsDescription>
          Check out my work on my <GitHubLink href="/projects">Projects Page</GitHubLink> or visit my  
          <GitHubLink href="https://github.com/chetopsa" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub Profile
          </GitHubLink>.
        </ProjectsDescription>
      </ProjectsSection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #fff;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const TextContainer = styled.div`
  flex: 2;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CurrentActivity = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const SkillsSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const SkillsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SkillsIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  color: #fff;

  i {
    margin-bottom: 0.5rem;
  }
`;

const SkillName = styled.p`
  font-size: 1rem;
`;

const ProjectsSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  border: 1px solid rgba(168, 239, 255, 0.5);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  background: rgba(168, 239, 255, 0.1);
`;

const ProjectsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProjectsDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;

  a {
    color: #a8efff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const GitHubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #a8efff;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #a8efff;
  background: rgba(168, 239, 255, 0.1);
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 1rem;

  &:hover {
    text-decoration: underline;
  }

  i {
    font-size: 1.5rem;
  }
`;

export default Home;