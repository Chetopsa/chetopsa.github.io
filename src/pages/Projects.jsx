import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../colors";

const Projects = () => {
  const [showSmall, setShowSmall] = useState(false);
  return (
    <PageContainer>
      <SectionTitle>Main Projects</SectionTitle>
      <MainProjectsGrid>
        {mainProjects.map(project => (
          <MainProjectCard key={project.title}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectInfo>
              <ProjectName>{project.title}</ProjectName>
              <ProjectDesc>{project.description}</ProjectDesc>
              <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github" /> GitHub
              </ProjectLink>
            </ProjectInfo>
          </MainProjectCard>
        ))}
      </MainProjectsGrid>
      {!showSmall && (
        <LoadMoreBtn onClick={() => setShowSmall(true)}>Load More Projects</LoadMoreBtn>
      )}
      {showSmall && (
        <>
          <SectionTitle>Smaller Projects</SectionTitle>
          <SmallProjectsGrid>
            {smallProjects.map(project => (
              <SmallProjectCard key={project.title}>
                <SmallProjectName>{project.title}</SmallProjectName>
                <SmallProjectDesc>{project.description}</SmallProjectDesc>
                <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github" /> GitHub
                </ProjectLink>
              </SmallProjectCard>
            ))}
          </SmallProjectsGrid>
        </>
      )}
    </PageContainer>
  );
};
const mainProjects = [
  {
    title: "GamblR",
    description: "A personal gambling tracker with data visualizations and charts, built with Vue and Firebase.",
    image: "/project_gamblr.png",
    github: "https://github.com/chetopsa/gamblr"
  },
  {
    title: "3D Gaussian Splatting",
    description: "Custom Structure-from-Motion pipeline and 3D Gaussian Splatting model in Python, OpenCV, and PyTorch.",
    image: "/project_gaussian.png",
    github: "https://github.com/chetopsa/gaussian-splatting"
  },
  {
    title: "Drone Delivery System",
    description: "Modular drone delivery simulation backend in C++ with OOP, Docker, and Doxygen.",
    image: "/project_drone.png",
    github: "https://github.com/chetopsa/drone-delivery"
  }
];
const smallProjects = [
  {
    title: "Client-Server Image Rotation",
    description: "Multi-threaded TCP client–server application in C on Linux.",
    github: "https://github.com/chetopsa/image-rotation"
  },
  {
    title: "Simple Portfolio",
    description: "A minimal portfolio site built with React (you're currenlty looking at it...",
    github: "https://github.com/chetopsa/simple-portfolio"
  },
  {
    title: "Data Viz Playground",
    description: "Experiments with D3.js and data visualization techniques.",
    github: "https://github.com/chetopsa/data-viz-playground"
  }
];
const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(23, 71, 48, 0.08);
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${colors.teal};
  margin: 2rem 0 1.5rem 0;
`;

const MainProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const MainProjectCard = styled.div`
  background: rgba(34, 112, 129, 0.13);
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(34,112,129,0.08);
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  max-width: 280px;
  border-radius: 0.7rem;
  margin-bottom: 1rem;
`;

const ProjectInfo = styled.div`
  width: 100%;
  text-align: center;
`;

const ProjectName = styled.h3`
  font-size: 1.3rem;
  color: ${colors.teal};
  margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.p`
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const ProjectLink = styled.a`
  color: ${colors.teal};
  font-weight: bold;
  text-decoration: none;
  border: 1px solid ${colors.teal};
  border-radius: 0.7rem;
  padding: 0.4rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 112, 129, 0.08);
  margin-top: 0.5rem;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${colors.teal};
    color: #fff;
  }
`;

const LoadMoreBtn = styled.button`
  margin: 2rem 0;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${colors.teal};
  background: rgba(34, 112, 129, 0.08);
  border: 2px solid ${colors.teal};
  border-radius: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${colors.teal};
    color: #fff;
  }
`;
const SmallProjectsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;
const SmallProjectCard = styled.div`
  background: rgba(34, 112, 129, 0.08);
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(34,112,129,0.06);
  width: 260px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const SmallProjectName = styled.h4`
  font-size: 1.1rem;
  color: ${colors.teal};
  margin-bottom: 0.3rem;
`;

const SmallProjectDesc = styled.p`
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 0.7rem;
`;

export default Projects;