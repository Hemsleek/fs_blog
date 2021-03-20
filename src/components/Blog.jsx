import React,{ useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, incrementLikes, deleteBlog }) => {
  const [showInfo, setshowInfo] = useState(false)

  const buttonStyle = {
    marginLeft:'5px',
    cursor:'pointer'
  }
  
  const blogStyle = {
    display:'flex',
    flexDirection:'column',
    margin:'7px 0',
    border:'1px solid gray',
    borderRadius:'10px',
    padding:'5px 7px',
    width:'fit-content',
    rowGap:'5px'
  }
  const removeButtonStyle = {
    cursor:'pointer',
    backgroundColor:'#4085F6',
    width:'fit-content',
    padding:'5px',
    border:'none',
    borderRadius:'5px'
  }

  return(
  <div style={blogStyle}>
    <span>
        {blog.title} -  {blog.author.toUpperCase()}
        <button onClick={() => setshowInfo(!showInfo)} style = { buttonStyle }>{showInfo? 'Hide' : 'View'}</button>
    </span>
    {showInfo && 
      <>
        <span>{blog.url}</span>
        <span>
          Likes - {blog.likes}
          <button onClick={() => incrementLikes(blog)} style={buttonStyle}>
            like
          </button>
        </span>

        <span>{ blog.author}</span>
        <button onClick={() => deleteBlog(blog)} style={removeButtonStyle}>
          Remove
        </button>
      </>
    }
  </div>
  )
}

Blog.propTypes = {
  blog:propTypes.object.isRequired,
  incrementLikes:propTypes.func.isRequired,
  deleteBlog:propTypes.func.isRequired
}

export default Blog
