import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { login } from './services/login'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({text:null,type:'error'})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

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
        setMessage({...message,text:error.response.data.error}); 
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
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setMessage({...message,text:`A new Blog ${Title.value} by ${Author.value} added`,type:'success'})
      form.reset()
      delayTimer()
      
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const handleLikesChange= async({ id, likes }) => {
    likes+=1
    try {
      const updatedBlog = await blogService.update(id,{likes})
      setBlogs(blogs.map(blog => blog.id===updatedBlog.id? updatedBlog : blog))
      
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = (blog) => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if(!confirmDelete) return null
       blogService.remove(blog.id).then( data => {
         console.log('i don enter this place already')
        setBlogs(blogs.filter(blogItem => blogItem.id!==blog.id))
        })
        .catch(err => console.log(err.response.data))
    
  }

  return (
    <>
      <Notification message = {message} />
      <div>
      {!user?
        <Toggable buttonLabel = 'Login'>
          <LoginForm 
            username = { username}
            password = { password }
            handleSubmit = {handleLogin}
            handleUsernameChange = {({ target }) => setUsername(target.value)}
            handlePasswordChange = { ({ target }) => setPassword(target.value) }
          />
        </Toggable>
        :
        <>
        <h2>blogs</h2>
        <h3>
          {user.username} logged in{'\t'}
          <button onClick = {handleLogout}>logout</button>
        </h3>
        <Toggable buttonLabel= 'New Note' ref= { blogFormRef }>
          <NewBlogForm handleSubmit = { addBlog}/>
        </Toggable>
        <div style={{marginTop:'1rem'}}>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} incrementLikes={handleLikesChange} deleteBlog={ deleteBlog } />
          )}
        </div>
       </>
      }
      </div>
    </>
  )
}

export default App