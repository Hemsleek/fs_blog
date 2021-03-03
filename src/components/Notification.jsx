import React from 'react'

const Notification = ({message}) => {
    if(message=== null) return null
    return (
         <div className="Notification">
             <h2>{ message }</h2>
            </div>
    
    )
}

export default Notification

