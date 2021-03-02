import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { login } from './services/login'

const App = () => { 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }

  },[])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('user' , JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
        console.log(error.response.data); 
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }
  const addBlog = async e =>{
    e.preventDefault()
    const newBlog = await blogService.create({title, author, url, likes:0})
    console.log({newBlog})
    setBlogs(blogs.concat(newBlog))
  }
  return (
    <>
      <Notification message = {message} />
      <div>
      {!user?
        <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
        </>
        :
        <>
        <form onSubmit={addBlog}>
          <div>
              title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
              author:
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
              url:
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">save</button>
        </form>
        <h2>blogs</h2>
        <h3>
          {user.username} logged in{'\t'}
          <button onClick = {handleLogout}>logout</button>
        </h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      }
      </div>
    </>
  )
}

export default App