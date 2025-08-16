

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close menu on route change (mobile)
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar-root">
      <Link to="/" className="navbar-logo" style={{ fontSize: isMobile ? '2.1rem' : '1.7rem' }}>VanikAI</Link>
      {isMobile && (
        <button
          className="navbar-hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      )}
      {(!isMobile || menuOpen) && (
        <div className={`navbar-links${isMobile ? ' mobile' : ''}`}>
          <Link to="/start/mvp" className={`navbar-link${location.pathname.startsWith('/start/mvp') ? ' active' : ''}`}>MVP Market Analysis</Link>
          <Link to="/start/market" className={`navbar-link${location.pathname.startsWith('/start/market') ? ' active' : ''}`}>Market Details & PMF</Link>
          <Link to="/start/competitive" className={`navbar-link${location.pathname.startsWith('/start/competitive') ? ' active' : ''}`}>Competitive Analysis</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
