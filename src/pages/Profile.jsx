import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.div`
  margin-bottom: 20px;
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

const Profile = () => {
  return (
    <ProfileContainer>
      <Section>
        <Header>Cheston Opsasnick</Header>
        <p>
          <a href="mailto:opsasnickcheston@gmail.com">opsasnickcheston@gmail.com</a> • (650) - 450 - 2838 •
          <a href="https://www.linkedin.com/in/ChestonO" target="_blank" rel="noopener noreferrer">
            www.linkedin.com/in/ChestonO
          </a>
        </p>
      </Section>

      <Section>
        <SubHeader>Education</SubHeader>
        <p>
          <strong>University of Minnesota, Twin Cities</strong> — Minneapolis, MN
        </p>
        <p>College of Science and Engineering</p>
        <p>Master of Science, Computer Science (Expected May 2026)</p>
        <p>Bachelor of Science, Computer Science (May 2025)</p>
        <p>Integrated B.S./M.S. Program in Computer Science</p>
      </Section>

      <Section>
        <SubHeader>Skills</SubHeader>
        <p>
          <strong>Programming Languages:</strong> Python, TypeScript, JavaScript, SQL, C++, C, Java, HTML, CSS, OCaml
        </p>
        <p>
          <strong>Tools:</strong> Node.js, Express.js, PostgreSQL, Flask, GraphQL, React, Docker, Unix, Git, PyTorch,
          MySQL, EC2, S3
        </p>
      </Section>

      <Section>
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
      </Section>

      <Section>
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
      </Section>

      <Section>
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
      </Section>
    </ProfileContainer>
  );
};

export default Profile;