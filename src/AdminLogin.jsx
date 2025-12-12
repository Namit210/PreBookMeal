import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const ADMIN_PASSWORD = 'password'; // Change this to your desired password

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headingStyle = {
    color: '#220303ff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#2f44a3ff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const errorStyle = {
    color: '#d32f2f',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Admin Panel</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Enter admin password"
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}
