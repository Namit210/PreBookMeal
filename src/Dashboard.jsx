import { Link } from "react-router-dom"
import Pending from "./Pending"
import { Routes, Route } from "react-router-dom"
import Confirmed from "./Confirmed"

export default function Dashboard(){   
const headingStyle ={
                color: '#220303ff',
                margin: '3rem 0 1rem 0',
                fontSize: '2.3rem',
                fontWeight: 'bold'
            }
    return(
        <div style={{width:'80%', margin:'2rem auto'}}>
            <div style={headingStyle}>Admin Dashboard</div>
            <div style={{width:'80%'}} >
                <ul style={{display:'flex', listStyleType:'none', justifyContent:'space-between'}}>
                    <li> <Link to='/dashboard'>Pending Bookings</Link></li>
                    <li> <Link to='/dashboard/confirmed'>Confirmed Bookings</Link></li>
                    <li> <Link to='/'>Create New Booking</Link></li>                    
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Pending />} />
                <Route path="/confirmed" element={<Confirmed />} />
            </Routes>
            
        </div>
    )
}