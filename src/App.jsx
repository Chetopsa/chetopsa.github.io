import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar'
import Profile from "./pages/Profile";
import Home from "./pages/Home"
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import DustBackground from "./components/DustBackground";

// react-markdown and the highlight.js grammars live only in this chunk.
const BlogPost = lazy(() => import("./pages/BlogPost"));

// react-router doesn't reset scroll between routes. Without this you land
// mid-post when going from a scrolled /blog to /blog/:slug.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    DustBackground();
  }, []);
  return (
    <>
    <Router>
      <ScrollToTop />
      <NavBar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    </>

  )
}

export default App
