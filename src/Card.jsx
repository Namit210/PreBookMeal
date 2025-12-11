export default function Card({children, heading,img,style,imgstyle}){
    return(
        <div style={{display:'flex', margin:'2rem auto', padding:'1rem',borderRadius:'10px', overflow:'hidden', backgroundColor:'#f5f5f5ff', boxShadow:'0 4px 8px rgba(0,0,0,0.1)', ...style}}>
            <div style={{width:'50%'}}>
                <div style={{fontSize:'3rem', fontWeight:'bold', marginBottom:'1rem', color:'#220303ff'}}>
                    {heading}
                </div>
            {children}
            </div>
            <div style={{textAlign:'center',width:'50%',justifyContent:'center', alignItems:'center', display:'flex'}}>
                <img src={img} style={imgstyle} />
            </div>
        </div>
    )
}