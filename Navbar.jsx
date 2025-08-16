
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar-root">
      <Link to="/" className="navbar-logo">VanikAI</Link>
      <div className="navbar-links">
        <Link to="/start/mvp" className={`navbar-link${location.pathname.startsWith('/start/mvp') ? ' active' : ''}`}>MVP Market Analysis</Link>
        <Link to="/start/market" className={`navbar-link${location.pathname.startsWith('/start/market') ? ' active' : ''}`}>Market Details & PMF</Link>
        <Link to="/start/competitive" className={`navbar-link${location.pathname.startsWith('/start/competitive') ? ' active' : ''}`}>Competitive Analysis</Link>
      </div>
    </nav>
  );
}

export default Navbar;
