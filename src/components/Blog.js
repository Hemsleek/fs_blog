import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} -  {blog.author.toUpperCase()}
  </div>
)

export default Blog
