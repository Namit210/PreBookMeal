import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <style>{`
                @media (max-width: 768px) {
                    .footer-container {
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center;
                        padding: 1.5rem 1rem !important;
                    }
                    .footer-logo {
                        font-size: 1rem !important;
                        margin-bottom: 1.5rem;
                    }
                    .footer-section {
                        margin: 1rem 0 !important;
                        width: 100%;
                    }
                }
            `}</style>
            <div 
                className="footer-container"
                style={{
                    display:'flex', 
                    justifyContent:'space-around', 
                    alignItems:'flex-start', 
                    padding:'2rem', 
                    backgroundColor:'#f5f5f5ff', 
                    marginTop:'2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div className="footer-logo logo" style={{
                    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF6B35, #F7931E, #FDC830)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.5px',
                    textAlign: 'center'
                }}>
                    Sri Sri <br />Jagannath Dham
                </div>
                <FootList heading='Quick Links' className="footer-section" style={{margin:'0 3rem 0 0'}}>
                    {[
                        { text: 'Book Meal', link: '/' },
                        { text: 'Rules & Help', link: '/help' },
                        { text: 'Admin Panel', link: '/admin-panel' }
                    ]}
                </FootList>
               
                <FootList heading='Contact Us' className="footer-section" style={{margin:'0 0 0 3rem'}}>
                    {[
                        { text: 'Phone: +91 9748005891', link: null },
                        { text: 'Address: ISKCON Kalyani (B9/63 Kalyani)', link: null }
                    ]}
                </FootList>
                <FootList heading='Legal' className="footer-section">
                    {[
                        { text: 'Privacy Policy', link: '/privacy-policy' },
                        { text: 'Terms of Service', link: '/terms-of-service' }
                    ]}
                </FootList>
                   
            </div>
        </>
    )
}

function FootList({heading, children, style, className}){
    return(
        <div style={style} className={className}>
           
                <div style={{fontWeight:'bold', marginBottom:'0.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}}>{heading}</div>
                <ul style={{listStyleType:'none', padding: 0, margin: 0}}>
                    {children.map((item, index) => (
                        <li key={index} style={{marginBottom:'0.5rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
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