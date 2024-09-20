import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';
import Dashboard from './components/pages/Dashboard';
import NoMatch from './components/pages/NoMatch';
import Layout from './components/pages/Layout';

function App() {
  return (
    <div className="w-full">
      <div className="flex flex-column">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
