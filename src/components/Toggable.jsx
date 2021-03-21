import React,{ useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef(({ buttonLabel, children },ref) => {
  const [visible, setvisbile] = useState(false)

  const showWhenVisible = { display:visible? '': 'none' }
  const hideWhenVisible = { display:visible? 'none': '' }

  const toggleVisibility = () => { setvisbile(!visible)}

  useImperativeHandle(ref,() => {
    return {
      toggleVisibility
    }
  })
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
)

Toggable.displayName = 'Toggable'
export default Toggable
