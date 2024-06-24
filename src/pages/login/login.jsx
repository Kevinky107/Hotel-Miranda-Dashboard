import { useContext, useEffect, useState } from 'react'
import './login.css'
import { AuthContext, ThemeContext } from '../../App';
import users from '../../assets/users.json'
import { useNavigate } from 'react-router-dom';

function Login() {

  const themeSelector = useContext(ThemeContext)
  const [auth, setAuth] = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.user !== null)
    {
      users.forEach( user => {
        if(user.id === localStorage.user)
        {
          setAuth(user)
          navigate('/home')
        }
      })
    }
  })

  const submit = (event) => {
    event.preventDefault()
    users.forEach( user => {
      if(user.username === event.target[0].value && user.password === event.target[1].value)
      {
        setAuth(user)
        localStorage.user = user.id
        navigate('/home')
      } else {
        window.alert("Wrong username or password, try again")
      }
    })
  }

  return (
    <div className={`login-`+themeSelector}>
      <div className='decoration'></div>
      <div className='decoration2'></div>
      <form onSubmit={submit}>
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