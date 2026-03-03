import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../colors";

const ProfileContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 32px 0;
  margin: 0 auto;
  line-height: 1.6;
  max-width: 1200px;
  width: 90vw;

`;

const AccordionContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  background: rgba(23, 71, 48, 0.08);
  width: 100%;
  min-width: 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const AccordionHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const AccordionContent = styled.div`
  padding: 0 0 12px 0;
  animation: fadeIn 0.2s;

`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const sections = [
  
  {
    title: "Education",
    content: (
      <>
        <SubHeader>Education</SubHeader>
        <p>
          <strong>University of Minnesota, Twin Cities</strong> — Minneapolis, MN
        </p>
        <p>College of Science and Engineering</p>
        <p>Master of Science, Computer Science (Expected May 2026)</p>
        <p>Bachelor of Science, Computer Science (May 2025)</p>
        <p>Integrated B.S./M.S. Program in Computer Science</p>
      </>
    )
  },
  {
    title: "Skills",
    content: (
      <>
        <SubHeader>Skills</SubHeader>
        <p>
          <strong>Programming Languages:</strong> Python, TypeScript, JavaScript, SQL, C++, C, Java, HTML, CSS, OCaml
        </p>
        <p>
          <strong>Tools:</strong> Node.js, Express.js, PostgreSQL, Flask, GraphQL, React, Docker, Unix, Git, PyTorch,
          MySQL, EC2, S3
        </p>
      </>
    )
  },
  {
    title: "Relevant Coursework",
    content: (
      <>
        <SubHeader>Relevant Coursework</SubHeader>
        <List>
          <ListItem>Advanced Algorithms and Data Structures</ListItem>
          <ListItem>Operating Systems</ListItem>
          <ListItem>Software Engineering</ListItem>
          <ListItem>Networks</ListItem>
          <ListItem>Computer Security</ListItem>
          <ListItem>Advanced ML</ListItem>
          <ListItem>NLP</ListItem>
          <ListItem>Computer Vision</ListItem>
          <ListItem>Programming an Interactive Web</ListItem>
          <ListItem>Distributed Computing</ListItem>
          <ListItem>Data Visualization</ListItem>
        </List>
      </>
    )
  },
  {
    title: "Work Experience",
    content: (
      <>
        <SubHeader>Work Experience</SubHeader>
        <p>
          <strong>Software Engineer Intern, Lifeworks Advisors</strong> (May 2025 - Jan 2026)
        </p>
        <List>
          <ListItem>
            Developed the frontend UI and state management in React for a new financial planning recommendations feature
          </ListItem>
          <ListItem>
            Built and integrated backend services (Node.js, GraphQL, PostgreSQL) to support creating, saving, and
            visualizing investment strategies
          </ListItem>
          <ListItem>
            Integrated with a Python Flask microservice that ran proprietary financial algorithms, enabling real-time
            generation of investment recommendations
          </ListItem>
          <ListItem>
            Enhanced backend APIs by implementing caching and data transformation layers to ensure consistency and
            improve performance
          </ListItem>
          <ListItem>
            Collaborated with engineers and product leads in an agile environment, fixing bugs, conducting code reviews,
            and delivering production-ready features
          </ListItem>
        </List>
      </>
    )
  },
  {
    title: "Projects",
    content: (
      <>
        <SubHeader>Projects</SubHeader>
        <p>
          <strong>GamblR (gamblr-16a50.firebaseapp.com), Programming an Interactive Web</strong> (November 2025)
        </p>
        <List>
          <ListItem>
            Developed a personal gambling tracker using Vue for the frontend and firebase on the backend
          </ListItem>
          <ListItem>Implemented an editable widget board with various data visualizations and charts</ListItem>
          <ListItem>Created an interactive 3d scene for the web utilizing the Three.js library</ListItem>
        </List>

        <p>
          <strong>3D Reconstruction with Gaussian Splatting, Computer Vision</strong> (October - December 2025)
        </p>
        <List>
          <ListItem>
            Built a custom Structure-from-Motion pipeline in Python using OpenCV and PyTorch, performing feature
            detection, pose estimation, triangulation
          </ListItem>
          <ListItem>
            Implemented GPU-accelerated bundle adjustment in PyTorch to jointly optimize camera poses and 3D points,
            improving reconstruction stability and reprojection error.
          </ListItem>
          <ListItem>
            Exported COLMAP-compatible outputs and trained a 3D Gaussian Splatting model
          </ListItem>
        </List>

        <p>
          <strong>Drone Delivery System Simulation, Program Design and Development</strong> (February - May 2024)
        </p>
        <List>
          <ListItem>
            Refactored and extended the backend of a drone delivery system simulation to improve modularity and
            extensibility
          </ListItem>
          <ListItem>Utilized C++ and OOP design principles to enhance extensibility and maintainability</ListItem>
          <ListItem>Used Doxygen for documentation and Docker to containerize the project</ListItem>
        </List>

        <p>
          <strong>Client-Server Image Rotation, Operating Systems</strong> (December 2023)
        </p>
        <List>
          <ListItem>Multi-threaded TCP client–server application in C on Linux</ListItem>
        </List>
      </>
    )
  }
];

const Profile = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <ProfileContainer>
      {sections.map((section, idx) => (
        <AccordionContainer key={section.title}>
          <AccordionHeader onClick={() => handleToggle(idx)}>
            {section.title}
            <span>{openIndex === idx ? "▲" : "▼"}</span>
          </AccordionHeader>
          {openIndex === idx && (
            <AccordionContent>{section.content}</AccordionContent>
          )}
        </AccordionContainer>
      ))}
    </ProfileContainer>
  );
};

export default Profile;