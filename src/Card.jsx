export default function Card({children, heading,img,style,imgstyle}){
    return(
        <>
            <style>{`
                @media (max-width: 768px) {
                    .card-container {
                        flex-direction: column !important;
                        margin: 1rem auto !important;
                        padding: 1rem !important;
                        width: 95% !important;
                    }
                    .card-content, .card-image {
                        width: 100% !important;
                    }
                    .card-heading {
                        font-size: 2rem !important;
                        text-align: center;
                    }
                    .card-content p {
                        text-align: center;
                    }
                }
            `}</style>
            <div 
                className="card-container"
                style={{
                    display:'flex', 
                    margin:'2rem auto', 
                    padding:'1rem',
                    borderRadius:'10px', 
                    overflow:'hidden', 
                    backgroundColor:'#f5f5f5ff', 
                    boxShadow:'0 4px 8px rgba(0,0,0,0.1)', 
                    ...style
                }}
            >
                <div className="card-content" style={{width:'50%'}}>
                    <div 
                        className="card-heading"
                        style={{
                            fontSize:'clamp(2rem, 5vw, 3rem)', 
                            fontWeight:'bold', 
                            marginBottom:'1rem', 
                            color:'#220303ff'
                        }}
                    >
                        {heading}
                    </div>
                    {children}
                </div>
                <div 
                    className="card-image"
                    style={{
                        textAlign:'center',
                        width:'50%',
                        justifyContent:'center', 
                        alignItems:'center', 
                        display:'flex'
                    }}
                >
                    <img 
                        src={img} 
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            ...imgstyle
                        }} 
                        alt={heading || 'Card image'}
                    />
                </div>
            </div>
        </>
    )
}