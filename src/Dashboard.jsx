import { Link, useNavigate, useLocation } from "react-router-dom"
import Pending from "./Pending"
import { Routes, Route } from "react-router-dom"
import Confirmed from "./Confirmed"

export default function Dashboard(){   
const navigate = useNavigate();
const location = useLocation();

const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
};

const headingStyle ={
                color: '#220303ff',
                margin: '3rem 0 1rem 0',
                fontSize: '2.3rem',
                fontWeight: 'bold'
            }

const getLinkStyle = (path) => ({
    padding: '0.6rem 1.5rem',
    textDecoration: 'none',
    color: '#172f35ff',
    backgroundColor: location.pathname === path ? '#fff' : 'transparent',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    boxShadow: location.pathname === path ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
});

    return(
        <div style={{width:'80%', margin:'2rem auto'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                <div style={headingStyle}>Admin Dashboard</div>
                <button onClick={handleLogout} style={{padding:'0.5rem 1rem', backgroundColor:'#d32f2f', color:'white', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>Logout</button>
            </div>
            <div style={{width:'80%'}} >
                <ul style={{display:'flex', listStyleType:'none', justifyContent:'space-between', padding: '0.6rem', backgroundColor: '#f5f5f5', borderRadius: '8px', margin: 0}}>
                    <li style={{margin: '0.2rem'}}> <Link to='/dashboard' style={getLinkStyle('/dashboard')}>Pending Bookings</Link></li>
                    <li style={{margin: '0.2rem'}}> <Link to='/dashboard/confirmed' style={getLinkStyle('/dashboard/confirmed')}>Confirmed Bookings</Link></li>
                    <li style={{margin: '0.2rem'}}> <Link to='/' style={getLinkStyle('/')}>Create New Booking</Link></li>                    
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Pending />} />
                <Route path="/confirmed" element={<Confirmed />} />
            </Routes>
            
        </div>
    )
}