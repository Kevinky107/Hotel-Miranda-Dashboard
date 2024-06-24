import { useContext, useState } from 'react'
import { Themes } from '../../assets/themes';

import './login.css'
import { AuthContext, ThemeContext } from '../../App';
import users from '../../assets/users.json'
import { useNavigate } from 'react-router-dom';

function Login() {

  const themeSelector = useContext(ThemeContext)
  const [auth, setAuth] = useContext(AuthContext)

  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    users.forEach( user => {
      if(user.username === event.target[0].value && user.password === event.target[1].value)
        {
          setAuth(user)
          navigate('/home')
        }
    })
    
  }

  return (
    <div className={themeSelector}>
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