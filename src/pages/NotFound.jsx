import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "/src/colors";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <Page>
      <Kicker>404</Kicker>
      <Title>Nothing here</Title>
      <Lede>
        There is no page at <code>{pathname}</code>.
      </Lede>
      <Actions>
        <PrimaryButton to="/">Go home</PrimaryButton>
        <SecondaryButton to="/blog">Read the blog</SecondaryButton>
      </Actions>
    </Page>
  );
};

export default NotFound;

const Page = styled.main`
  width: 100%;
  max-width: 1040px;
  /* Keeps a short page at least a screen tall, so the scrollbar does not
     toggle between routes. */
  min-height: 100vh;
  margin: 0 auto;
  padding: 8.5rem 1.25rem 4rem;
  color: ${colors.text};
  text-align: left;

  @media (min-width: 768px) {
    padding: 9rem 2.25rem 4.5rem;
  }
`;

const Kicker = styled.p`
  margin: 0 0 0.9rem;
  color: ${colors.warm};
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 5.3vw, 3.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

const Lede = styled.p`
  margin: 0.9rem 0 0;
  max-width: 44rem;
  color: ${colors.muted};
  line-height: 1.85;

  code {
    background: ${colors.surfaceAlt};
    border: 1px solid ${colors.borderSoft};
    border-radius: 6px;
    padding: 0.1rem 0.35rem;
    font-size: 0.9em;
  }
`;

const Actions = styled.div`
  margin-top: 1.6rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  border-radius: 8px;
  background: linear-gradient(135deg, ${colors.accent}, ${colors.accentDeep});
  color: ${colors.onAccent};
  font-weight: 700;
  padding: 0.7rem 1rem;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    color: ${colors.onAccent};
  }
`;

const SecondaryButton = styled(Link)`
  border-radius: 8px;
  border: 1px solid ${colors.border};
  background: ${colors.surface};
  color: ${colors.text};
  font-weight: 700;
  padding: 0.7rem 1rem;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    color: ${colors.text};
  }
`;
