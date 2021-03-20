import React from 'react'
import propTypes from 'prop-types'

const Notification = ({message}) => {
    if(message.text=== null) return null
    const styles =message.type==='error'?
        {color:'red',width:'fit-content',padding:'0 1rem', border:"1px solid red"} : 
        {color:'green',width:'fit-content',padding:'0 1rem', border:"1px solid green"}
        
    return (
         <div style={styles} className="Notification">
             <h2>{ message.text }</h2>
        </div>
    
    )
}
Notification.propTypes = {
    message:propTypes.object.isRequired
}

export default Notification

