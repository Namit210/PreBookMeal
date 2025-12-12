import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={navStyles}>
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .desktop-menu { display: none !important; }
          .mobile-menu { 
            display: ${menuOpen ? 'flex' : 'none'} !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
          }
          .mobile-menu li {
            margin: 0.5rem 0;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-menu { display: flex !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
      <div style={containerStyles}>
        <div style={logoStyles}>
          <Link to="/" style={{
            ...brandStyles, 
            fontFamily: "'Dancing Script', 'Brush Script MT', cursive", 
            fontSize: '1.8rem', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FF6B35, #F7931E, #FDC830)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '0.5px'
          }}>
            Sri Sri Jagannath Dham
          </Link>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMenu}
          style={hamburgerStyles}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // X icon when menu is open
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#172f35ff" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#172f35ff" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={desktopMenuContainerStyles}>
          <ul style={menuStyles}>
            <li><Link to="/" style={linkStyles}>Book Meal</Link></li>
            <li><Link to="/help" style={linkStyles}>Rules & Help</Link></li>
          </ul>
        </div>

        {/* Admin Panel on the right */}
        <div className="desktop-menu" style={{flex: '0 0 auto'}}>
          <Link to="/admin-panel" style={linkStyles}>Admin Panel</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <Link to="/" style={mobileLinkStyles} onClick={() => setMenuOpen(false)}>Book Meal</Link>
        <Link to="/help" style={mobileLinkStyles} onClick={() => setMenuOpen(false)}>Rules & Help</Link>
        <Link to="/admin-panel" style={mobileLinkStyles} onClick={() => setMenuOpen(false)}>Admin Panel</Link>
      </div>
    </nav>
  );
};

const navStyles = {
  backgroundColor: null,
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative'
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative'
};

const logoStyles = {
  fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
  fontWeight: 'bold',
  flex: '0 0 auto'
};

const brandStyles = {
  color: '#2f44a3ff',
  textDecoration: 'none',
};

const desktopMenuContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  gap: '2rem'
};

const menuStyles = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  gap: '2rem'
};

const linkStyles = {
  color: '#172f35ff',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
};

const mobileLinkStyles = {
  color: '#172f35ff',
  textDecoration: 'none',
  padding: '0.75rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  fontSize: '1rem',
  display: 'block',
  borderBottom: '1px solid #eee'
};

const hamburgerStyles = {
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  alignItems: 'center',
  justifyContent: 'center'
};

const hamburgerLineStyle = {
  width: '100%',
  height: '3px',
  backgroundColor: '#1f1d1dff',
  borderRadius: '2px',
  transition: 'all 0.3s ease'
};

export default NavBar;