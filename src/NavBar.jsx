import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <div style={logoStyles}>
          <Link to="/" style={brandStyles}>Mahaprasadam</Link>
        </div>
        <ul style={menuStyles}>
          <li><Link to="/" style={linkStyles}>Book Meal</Link></li>
          <li><Link to="/help" style={linkStyles}>Rules & Help</Link></li>
        </ul>
        <div>
          Admin Login
        </div>
      </div>
    </nav>
  );
};

const navStyles = {
  backgroundColor: null,
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const containerStyles = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyles = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const brandStyles = {
  color: '#2f44a3ff',
  textDecoration: 'none',

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
  transition: 'background-color 0.3s ease'
};

export default NavBar;