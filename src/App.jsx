import { useState, useEffect, use } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from './components/NavBar'
import Profile from "./pages/Profile";
import Home from "./pages/Home"
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import DustBackground from "./components/DustBackground";


function App() {
  useEffect(() => {
    DustBackground();
  }, []);
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </>

  )
}

export default App
