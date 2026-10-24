import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "/src/colors";
import { posts, allTags, formatDate } from "/src/content/posts";

const Blog = () => {
  // Keeping the active tag in the URL makes /blog?tag=react shareable and
  // survives a reload. replace:true keeps tag-mashing out of the back button.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const visible = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  const selectTag = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (!tag || tag === activeTag) next.delete("tag");
    else next.set("tag", tag);
    setSearchParams(next, { replace: true });
  };

  return (
    <Page>
      <Kicker>Writing</Kicker>
      <PageTitle>
        The <Accent>Blog</Accent>
      </PageTitle>
      <Lede>Notes on what I&apos;m building, what broke, and what I&apos;d do differently.</Lede>

      {allTags.length > 0 && (
        <TagBar>
          <TagChip type="button" $active={!activeTag} onClick={() => selectTag(null)}>
            All
          </TagChip>
          {allTags.map((tag) => (
            <TagChip
              key={tag}
              type="button"
              $active={tag === activeTag}
              onClick={() => selectTag(tag)}
            >
              {tag}
            </TagChip>
          ))}
        </TagBar>
      )}

      {visible.length === 0 ? (
        <EmptyState>
          Nothing tagged <strong>{activeTag}</strong> yet.
        </EmptyState>
      ) : (
        <PostList>
          {visible.map((post) => (
            <PostCard key={post.slug} to={`/blog/${post.slug}`}>
              <PostMeta>
                {formatDate(post.date)}
                <MetaDot />
                {post.readingTime} min read
                {post.draft && <DraftBadge>Draft</DraftBadge>}
              </PostMeta>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              {/* Always rendered, even when empty, so a post without tags is
                  the same height as one with them. */}
              <CardTagRow>
                {post.tags.map((tag) => (
                  <CardTag key={tag}>#{tag}</CardTag>
                ))}
              </CardTagRow>
            </PostCard>
          ))}
        </PostList>
      )}
    </Page>
  );
};

export default Blog;

const Page = styled.main`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 8.5rem 1.25rem 4rem;
  color: ${colors.text};
  text-align: left; /* #root in App.css centers everything by default */

  /* Keeps the page at least a screen tall, so filtering to fewer posts cannot
     toggle the scrollbar and nudge the layout sideways. The sideways jump
     itself was body's flex centring — see the note in index.css. */
  min-height: 100vh;

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

const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 5.3vw, 3.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

const Accent = styled.span`
  color: ${colors.accent};
`;

const Lede = styled.p`
  margin: 0.9rem 0 0;
  max-width: 44rem;
  color: ${colors.muted};
  font-size: 1rem;
  line-height: 1.85;
`;

const TagBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0 2.25rem;
`;

const TagChip = styled.button`
  border: 1px solid ${({ $active }) => ($active ? colors.accent : colors.border)};
  background: ${({ $active }) => ($active ? colors.accent : "transparent")};
  color: ${({ $active }) => ($active ? colors.onAccent : colors.muted)};
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accent};
    color: ${({ $active }) => ($active ? colors.onAccent : colors.text)};
  }
`;

const PostList = styled.div`
  display: grid;
  gap: 1rem;
`;

const PostCard = styled(Link)`
  display: block;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  background: ${colors.surface};
  color: ${colors.text};
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accent};
    color: ${colors.text};
  }

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
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
  /* The draft badge is taller than bare text; reserve for the taller case so
     cards with and without it line up. */
  min-height: 1.5rem;
`;

const MetaDot = styled.span`
  flex: 0 0 auto;
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

/* Title and excerpt are clamped to a fixed number of lines, and floored at
   that height, so every card is the same size no matter how long the title
   is. Keep line-height and the min-height multiplier in sync. */
const PostTitle = styled.h2`
  margin: 0.6rem 0 0.5rem;
  color: ${colors.text};
  font-size: 1.35rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
  min-height: 2.6em; /* 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

const PostExcerpt = styled.p`
  margin: 0;
  max-width: 44rem;
  color: ${colors.muted};
  font-size: 0.98rem;
  line-height: 1.75;
  min-height: 5.25em; /* 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

const CardTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
  min-height: 1.2rem; /* holds its place when a post has no tags */
`;

const CardTag = styled.span`
  color: ${colors.mutedDim};
  font-size: 0.78rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  background: ${colors.well};
  color: ${colors.muted};
  /* Roughly one card tall, so switching to a tag with no posts doesn't
     collapse the list area. */
  min-height: 11rem;

  strong {
    color: ${colors.text};
  }
`;
