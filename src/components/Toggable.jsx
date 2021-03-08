import React,{ useState } from 'react'

const Toggable = ({buttonLabel, children }) => {
    const [visible, setvisbile] = useState(false)
    
    const showWhenVisible = { display:visible? '': 'none' }
    const hideWhenVisible = { display:visible? 'none': '' }

    const toggleVisibility = () => { setvisbile(!visible)}
    
    return (
        <div className="Toggable">
            <div style = {hideWhenVisible}>
                <button onClick = {toggleVisibility}>{ buttonLabel}</button>
            </div>
            <div style= {showWhenVisible}>
                { children }
                <button onClick={ toggleVisibility }>Cancel</button>
            </div>
        </div>
    )
}

export default Toggable
