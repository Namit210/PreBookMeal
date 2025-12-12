import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start', padding:'2rem', backgroundColor:'#f5f5f5ff', marginTop:'2rem'}}>
            <div className="logo">Hare Krishna !</div>
            <FootList heading='Quick Links' style={{margin:'0 3rem 0 0'}}>
                {[
                    { text: 'Book Meal', link: '/' },
                    { text: 'Rules & Help', link: '/help' },
                    { text: 'Admin Panel', link: '/admin-panel' }
                ]}
            </FootList>
           
            <FootList heading='Contact Us' style={{margin:'0 0 0 3rem'}}>
                {[
                    { text: 'Phone: +91 8077871623', link: null },
                    { text: 'Address: Kalyani', link: null }
                ]}
            </FootList>
            <FootList heading='Legal'>
                {[
                    { text: 'Privacy Policy', link: '/privacy-policy' },
                    { text: 'Terms of Service', link: '/terms-of-service' }
                ]}
            </FootList>
               
        </div>
    )
}

function FootList({heading, children, style}){
    return(
        <div style={style}>
           
                <div style={{fontWeight:'bold', marginBottom:'0.5rem'}}>{heading}</div>
                <ul style={{listStyleType:'none'}}>
                    {children.map((item, index) => (
                        <li key={index} style={{marginBottom:'0.5rem'}}>
                            {item.link && item.link.startsWith('/') ? (
                                <Link to={item.link} style={{color:'#172f35ff',fontWeight:'normal', textDecoration:'none'}}>{item.text}</Link>
                            ) : item.link ? (
                                <a href={item.link} style={{color:'#172f35ff',fontWeight:'normal', textDecoration:'none'}}>{item.text}</a>
                            ) : (
                                <span>{item.text}</span>
                            )}
                        </li>
                    ))}
                </ul>
           
        </div>
    )
}