import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styled from "styled-components";
import { colors } from "/src/colors";

// Module-level constants: inline array literals would be new identities on
// every render and make react-markdown rebuild its processor each time.
const remarkPlugins = [remarkGfm];
// ignoreMissing keeps an unknown language fence from throwing; detect:false
// means an unlabeled block renders plain rather than being mis-guessed.
const rehypePlugins = [[rehypeHighlight, { detect: false, ignoreMissing: true }]];

// react-markdown v9+ dropped the className prop, so this wrapper is the only
// way to style the rendered output.
const Markdown = ({ children }) => (
  <Prose>
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {children}
    </ReactMarkdown>
  </Prose>
);

export default Markdown;

const Prose = styled.div`
  padding: 1.5rem 1.25rem 2rem;
  background: ${colors.well};
  color: ${colors.muted};
  font-size: 1rem;
  line-height: 1.8;
  text-align: left; /* defeats #root { text-align: center } in App.css */
  overflow-wrap: break-word; /* a long URL must not blow out the card */

  @media (min-width: 768px) {
    padding: 2rem 2.25rem 2.5rem;
  }

  > * {
    max-width: 44rem;
  }
  > pre,
  > table,
  > img,
  > hr {
    max-width: 100%;
  }
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }

  h2 {
    margin: 2.25rem 0 0.75rem;
    color: ${colors.text};
    font-size: clamp(1.4rem, 2.6vw, 1.8rem);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  h3 {
    margin: 1.75rem 0 0.6rem;
    color: ${colors.text};
    font-size: 1.15rem;
  }
  h4 {
    margin: 1.5rem 0 0.5rem;
    color: ${colors.warm};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  p {
    margin: 0 0 1.1rem;
  }
  strong,
  em {
    color: ${colors.text};
  }

  a {
    color: ${colors.accent};
    text-decoration: none;
    border-bottom: 1px solid ${colors.borderSoft};
    transition: border-color 0.2s ease;

    &:hover {
      color: ${colors.accent};
      border-bottom-color: ${colors.accent};
    }
  }

  /* Dot bullets, matching Profile's DotItem */
  ul,
  ol {
    margin: 0 0 1.1rem;
    padding: 0;
    list-style: none;
  }
  ol {
    counter-reset: prose-ol;
  }
  li {
    position: relative;
    padding-left: 1rem;
    margin-bottom: 0.45rem;
  }
  ul > li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.68rem;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 999px;
    background: ${colors.accent};
  }
  ol > li {
    counter-increment: prose-ol;
    padding-left: 1.6rem;
  }
  ol > li::before {
    content: counter(prose-ol) ".";
    position: absolute;
    left: 0;
    color: ${colors.accent};
    font-variant-numeric: tabular-nums;
  }
  li > ul,
  li > ol {
    margin: 0.45rem 0 0;
  }

  /* GFM task lists ship their own checkbox */
  li.task-list-item {
    padding-left: 0;
  }
  li.task-list-item::before {
    content: none;
  }
  li input[type="checkbox"] {
    margin-right: 0.5rem;
    accent-color: ${colors.accent};
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 0.25rem 0 0.25rem 1rem;
    border-left: 2px solid ${colors.accent};
    color: ${colors.text};
    font-style: italic;
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.88em;
    background: ${colors.surfaceAlt};
    border: 1px solid ${colors.borderSoft};
    border-radius: 6px;
    padding: 0.1rem 0.35rem;
  }

  pre {
    margin: 1.5rem 0;
    padding: 1rem 1.1rem;
    border-radius: 10px;
    border: 1px solid ${colors.borderSoft};
    background: ${colors.surfaceAlt};
    overflow-x: auto; /* a long line must scroll, not widen the card */
    line-height: 1.6;
  }
  pre code {
    background: none;
    border: 0;
    padding: 0;
    display: block;
    white-space: pre;
    font-size: 0.86rem;
    color: ${colors.text};
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.5rem 0;
    border-radius: 10px;
    border: 1px solid ${colors.borderSoft};
  }

  hr {
    border: 0;
    border-top: 1px solid ${colors.border};
    margin: 2rem 0;
  }

  table {
    display: block;
    overflow-x: auto;
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.94rem;
  }
  th,
  td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid ${colors.borderSoft};
    text-align: left;
  }
  th {
    color: ${colors.warm};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  /* highlight.js tokens, on-palette instead of importing a stock theme */
  .hljs-comment,
  .hljs-quote {
    color: ${colors.faint};
    font-style: italic;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-type,
  .hljs-built_in {
    color: ${colors.accent};
  }
  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-number,
  .hljs-symbol,
  .hljs-bullet {
    color: ${colors.warm};
  }
  .hljs-title,
  .hljs-section,
  .hljs-name {
    color: ${colors.text};
    font-weight: 600;
  }
  .hljs-attr,
  .hljs-attribute,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-params {
    color: ${colors.muted};
  }
  .hljs-meta,
  .hljs-deletion {
    color: ${colors.faint};
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }
`;
