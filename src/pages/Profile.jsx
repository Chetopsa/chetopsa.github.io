import React from "react";
import styled from "styled-components";

const Page = styled.main`
  max-width: 1040px;
  margin: 0 auto;
  padding: 8.5rem 1.25rem 4rem;
  color: #e5e2e3;

  @media (min-width: 768px) {
    padding: 9rem 2.25rem 4.5rem;
  }
`;

const Hero = styled.section`
  margin-bottom: 3.5rem;
`;

const HeroWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 900px) {
    align-items: flex-start;
    flex-direction: row;
    gap: 2.5rem;
  }
`;

const AvatarShell = styled.div`
  position: relative;
  border-radius: 999px;
  padding: 4px;
  background: linear-gradient(145deg, #76d6d5 0%, #008080 100%);
  box-shadow: 0 18px 40px rgba(118, 214, 213, 0.25);
`;

const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 999px;
  object-fit: cover;
  display: block;

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }
`;

const HeroText = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
  }
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 5.3vw, 3.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

const Accent = styled.span`
  color: #76d6d5;
`;

const Tagline = styled.p`
  margin: 0.9rem 0 1.25rem;
  color: #ffb692;
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
`;

const Intro = styled.p`
  margin: 0;
  max-width: 44rem;
  color: #bdc9c8;
  font-size: 1rem;
  line-height: 1.85;
`;

const Actions = styled.div`
  margin-top: 1.6rem;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled.a`
  border-radius: 8px;
  background: linear-gradient(135deg, #76d6d5, #008080);
  color: #003737;
  font-weight: 700;
  padding: 0.7rem 1rem;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.a`
  border-radius: 8px;
  border: 1px solid #3e4949;
  color: #e5e2e3;
  font-weight: 700;
  padding: 0.7rem 1rem;
  text-decoration: none;
  background: rgba(53, 52, 54, 0.25);
`;

const Sections = styled.div`
  display: grid;
  gap: 1rem;
`;

const Panel = styled.details`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(62, 73, 73, 0.55);
  background: #1c1b1c;
`;

const PanelSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;

  &::-webkit-details-marker {
    display: none;
  }
`;

const PanelContent = styled.div`
  padding: 1.2rem 1.25rem 1.4rem;
  background: rgba(14, 14, 15, 0.6);
  color: #bdc9c8;
  line-height: 1.75;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h4`
  margin: 0;
  color: #e5e2e3;
  font-size: 1.05rem;
`;

const Meta = styled.p`
  margin: 0;
  color: #aacdcc;
  font-weight: 600;
  font-size: 0.92rem;
`;

const DotList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DotItem = styled.li`
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.45rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 999px;
    background: #76d6d5;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SkillCard = styled.div`
  padding: 0.9rem;
  border-radius: 10px;
  border: 1px solid rgba(62, 73, 73, 0.45);
  background: #201f20;
`;

const SkillTitle = styled.h5`
  margin: 0 0 0.6rem;
  color: #ffb692;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const Footer = styled.footer`
  margin-top: 2rem;
  text-align: center;
  color: #879392;
  font-size: 0.86rem;
`;

const Profile = () => {
  return (
    <Page>
      <Hero>
        <HeroWrap>
          <AvatarShell>
            <Avatar
              alt="Portrait of Cheston Opsasnick"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPAA5jSF1Vi7YuyEW988_8qpgDmJADy2mhzZysyeAfM3gtQxc29C9k6uq45kkzAWdcZuLfZpSBsXVwV9UZgiB4kDQz-Lc0J5FuG1o8vigvoBmTWMICJO7x1ypxzWsZcwqOSfdU1tsvJ7oCmXmJAf7NZHF8rHZSG_8FaoQxVs3IVOxXgdBxjpMQAwiABHyovJ2zEOvvvmEyk0xNxh-x3a6NNS32gkT8CDNjSyxtxnH1hLGczEMseOV8ZmXFY8gRrAybwzfmZcw8OnK"
            />
          </AvatarShell>

          <HeroText>
            <Name>
              Cheston <Accent>Opsasnick</Accent>
            </Name>
            <Tagline>Software Engineer • Full-Stack Developer • ML Enthusiast</Tagline>
            <Intro>
              I build reliable full-stack systems and data-driven applications with a focus on clean architecture,
              performance, and maintainable code. I enjoy taking products from concept to production with practical,
              measurable impact.
            </Intro>
            <Actions>
              <PrimaryButton href="/ChestonOpsasnickResume.pdf">Download Resume</PrimaryButton>
              <SecondaryButton href="/contact">Get in Touch</SecondaryButton>
            </Actions>
          </HeroText>
        </HeroWrap>
      </Hero>

      <Sections>
        <Panel open>
          <PanelSummary>About Me <span>⌄</span></PanelSummary>
          <PanelContent>
            <p>
              I am currently pursuing graduate studies in Computer Science at the University of Minnesota while
              continuing hands-on product and platform development work.
            </p>
            <p>
              My interests include distributed systems, machine learning, and building polished user-facing experiences
              backed by robust APIs and data pipelines.
            </p>
          </PanelContent>
        </Panel>

        <Panel open>
          <PanelSummary>Experience <span>⌄</span></PanelSummary>
          <PanelContent>
            <Row>
              <Title>Software Engineer Intern</Title>
              <Meta>Lifeworks Advisors • May 2025 — Jan 2026</Meta>
              <DotList>
                <DotItem>Built React UI and state management for financial planning recommendations.</DotItem>
                <DotItem>Implemented GraphQL and PostgreSQL-backed Node.js services.</DotItem>
                <DotItem>Integrated Flask-based algorithm service for real-time recommendation output.</DotItem>
              </DotList>
            </Row>
          </PanelContent>
        </Panel>

        <Panel open>
          <PanelSummary>Education <span>⌄</span></PanelSummary>
          <PanelContent>
            <Row>
              <Title>University of Minnesota, Twin Cities</Title>
              <Meta>Integrated B.S./M.S. in Computer Science</Meta>
              <p style={{ margin: 0 }}>M.S. (Expected May 2026) • B.S. (May 2025)</p>
            </Row>
          </PanelContent>
        </Panel>

        <Panel open>
          <PanelSummary>Skills <span>⌄</span></PanelSummary>
          <PanelContent>
            <SkillGrid>
              <SkillCard>
                <SkillTitle>Languages</SkillTitle>
                <DotList>
                  <DotItem>Python, TypeScript, JavaScript, SQL</DotItem>
                  <DotItem>C++, C, Java, OCaml</DotItem>
                </DotList>
              </SkillCard>
              <SkillCard>
                <SkillTitle>Frameworks & Tools</SkillTitle>
                <DotList>
                  <DotItem>React, Node.js, Express.js, GraphQL</DotItem>
                  <DotItem>PostgreSQL, Flask, Docker, Git, Unix</DotItem>
                </DotList>
              </SkillCard>
            </SkillGrid>
          </PanelContent>
        </Panel>
      </Sections>

      <Footer>© 2026 Cheston Opsasnick</Footer>
    </Page>
  );
};

export default Profile;