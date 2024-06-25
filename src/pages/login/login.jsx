import { useContext, useEffect, useState } from 'react'
import './login.css'
import { ThemeContext } from '../../App';
import users from '../../assets/users.json'
import { useNavigate } from 'react-router-dom';

function Login() {

  const themeSelector = useContext(ThemeContext)

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || {}

  useEffect(() => {
    if(user.id !== null)
    {
      users.forEach( element => {
        if(element.id === user.id)
          navigate('/Dashboard')     
      })
    }
  })

  const submitHandler = (event) => {
    event.preventDefault()
    users.forEach( user => {
      if(user.username === event.target[0].value && user.password === event.target[1].value)
      {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/Dashboard')
      } else {
        window.alert("Wrong username or password, try again")
      }
    })
  }

  return (
    <div className={`login-`+themeSelector}>
      <div className='decoration'></div>
      <div className='decoration2'></div>
      <form onSubmit={submitHandler}>
        <h2>LOGIN HERE</h2>
        <p>USERNAME</p>
        <input type='text' />
        <p>PASSWORD</p>
        <input type='password' />
        <button>LOGIN</button>
      </form>
    </div>
  )
}

export default Login