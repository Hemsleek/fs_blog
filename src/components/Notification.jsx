import React from 'react'

const Notification = ({message}) => {
    if(message.text=== null) return null
    const styles =message.type==='error'?{color:'red',border:"1px solid red"} :
        {color:'green',border:"1px solid green"}
    return (
         <div style={styles} className="Notification">
             <h2>{ message.text }</h2>
        </div>
    
    )
}

export default Notification

