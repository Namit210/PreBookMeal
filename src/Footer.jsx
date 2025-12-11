export default function Footer(){
    return(
        <div style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start', padding:'2rem', backgroundColor:'#f5f5f5ff', marginTop:'2rem'}}>
            <div className="logo">Hare Krishna !</div>
            <FootList heading='Quick Links' style={{margin:'0 3rem 0 0'}}>
                {
                    ['Book Meal',
                        'Rules & Help',
                        'Admin Login'
                    ]
                }
            </FootList>
           
            <FootList heading='Contact Us' style={{margin:'0 0 0 3rem'}}>
                {
                    ['Phone: +91 8077871623',
                        'Address: Kalyani'
                    ]
                }
            </FootList>
            <FootList heading='Legal'>
                {
                    ['Privacy Policy',
                        'Terms of Service'
                    ]
                }
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
                        <li key={index} style={{marginBottom:'0.5rem'}}>{item}</li>
                    ))}
                </ul>
           
        </div>
    )
}