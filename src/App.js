import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { login } from './services/login'
import LoginForm from './components/LoginForm.jsx'

const App = () => {
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
    const form = e.target
    const [Title,Author,Url] = e.target
    console.log(Title,Author,Url)
    

    try {
      const newBlog = await blogService.create({title:Title.value, author:Author.value, url:Url.value, likes:0})
      console.log({newBlog})
      setBlogs(blogs.concat(newBlog))
      setMessage({...message,text:`A new Blog ${Title.value} by ${Author.value} added`,type:'success'})
      form.reset()
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
        <LoginForm 
        username = { username}
        password = { password }
        handleSubmit = {handleLogin}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = { ({ target }) => setPassword(target.value) }
        />
        :
        <>
        <form onSubmit={addBlog}>
          <div>
              title:
              <input
              type="text"
              name="Title"
            />
          </div>
          <div>
              author:
              <input
              type="text"
              name="Author"
            />
          </div>
          <div>
              url:
              <input
              type="text"
              name="Url"
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