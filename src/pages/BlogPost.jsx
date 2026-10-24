import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Markdown from "/src/components/Markdown";
import { colors } from "/src/colors";
import { getPost, formatDate } from "/src/content/posts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  // Render in place rather than redirecting, so a bad link stays diagnosable
  // and the back button behaves normally.
  if (!post) {
    return (
      <Page>
        <Kicker>404</Kicker>
        <PostTitle>No post here</PostTitle>
        <Lede>
          There is nothing at <code>/blog/{slug}</code>. It may have been renamed.
        </Lede>
        <BackLink to="/blog">← All posts</BackLink>
      </Page>
    );
  }

  return (
    <Page>
      <BackLink to="/blog">← All posts</BackLink>
      <PostHeader>
        <PostMeta>
          {formatDate(post.date)}
          <MetaDot />
          {post.readingTime} min read
          {post.draft && <DraftBadge>Draft</DraftBadge>}
        </PostMeta>
        <PostTitle>{post.title}</PostTitle>
        {post.tags.length > 0 && (
          <TagRow>
            {post.tags.map((tag) => (
              <TagLink key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                #{tag}
              </TagLink>
            ))}
          </TagRow>
        )}
      </PostHeader>

      <Article>
        <Markdown>{post.body}</Markdown>
      </Article>

      <Footer>
        <BackLink to="/blog">← All posts</BackLink>
      </Footer>
    </Page>
  );
};

export default BlogPost;

const Page = styled.main`
  width: 100%;
  max-width: 1040px;
  /* Keeps a short page at least a screen tall, so the scrollbar does not
     toggle between routes. */
  min-height: 100vh;
  margin: 0 auto;
  padding: 8.5rem 1.25rem 4rem;
  color: ${colors.text};
  text-align: left; /* #root in App.css centers everything by default */

  @media (min-width: 768px) {
    padding: 9rem 2.25rem 4.5rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: ${colors.muted};
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    color: ${colors.accent};
  }
`;

const PostHeader = styled.header`
  margin: 1.5rem 0 2rem;
`;

const Kicker = styled.p`
  margin: 0 0 0.9rem;
  color: ${colors.warm};
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: ${colors.warm};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const MetaDot = styled.span`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 999px;
  background: ${colors.accent};
`;

const DraftBadge = styled.span`
  padding: 0.1rem 0.5rem;
  border: 1px solid ${colors.warm};
  border-radius: 999px;
  font-size: 0.7rem;
`;

const PostTitle = styled.h1`
  margin: 0.7rem 0 0;
  font-size: clamp(2rem, 4.6vw, 3rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
`;

const Lede = styled.p`
  margin: 0.9rem 0 1.5rem;
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

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
`;

const TagLink = styled(Link)`
  color: ${colors.mutedDim};
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${colors.accent};
  }
`;

const Article = styled.article`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${colors.border};
  background: ${colors.surface};
`;

const Footer = styled.footer`
  margin-top: 2rem;
  color: ${colors.faint};
`;
