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
  const [message, setMessage] = useState({text:null,type:'error'})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const delayTimer = (timer=3000) =>{
    setTimeout(() => {
      setMessage({...message,text:null})
    }, timer);
  }

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
        setMessage({...message,text:error.response.data}); 
       delayTimer()
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }
  const addBlog = async e =>{
    e.preventDefault()
    try {
      const newBlog = await blogService.create({title, author, url, likes:0})
      console.log({newBlog})
      setBlogs(blogs.concat(newBlog))
      setMessage({...message,text:`A new Blog ${title} by ${author} added`,type:'success'})
      setTitle('')
      setUrl('')
      setAuthor('')
      delayTimer()
      
    } catch (error) {
      console.log(error.response.data)
    }
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