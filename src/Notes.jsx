export default function Notes({children, heading, type, style}){
    const headingStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop:'1rem',
        color: '#220303ff',
        paddingLeft:'1.5rem'
    }
    return(
        <div style={{padding:'0.5rem',...style}}>
            <div style={headingStyle}>
            {heading}
            </div>
            <ul style={{listStyleType:type, paddingLeft:'1.5rem'}}>
                {Object.entries(children).map(([key, value])=>(
                    <li style={{marginBottom:'0.5rem'}}>{key && <strong>{key}:</strong>} {value}</li>
                ))}
            </ul>
        </div>
    )
}