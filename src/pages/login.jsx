import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import users from '../assets/users.json'
import { useNavigate } from 'react-router-dom';
import { LoginBackground, LoginInputPassword, LoginInputText } from '../components/loginStyled';
import { AuthContext } from '../context/auth';

function Login() {

  const themeSelector = useContext(ThemeContext)
  const {contextAuth, contextAuthDispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(contextAuth.id !== null && contextAuth.state === true)
    {
      users.forEach( element => {
        if(element.id === contextAuth.id)
          navigate('/Dashboard')     
      })
    }
  })

  const submitHandler = (event) => {
    event.preventDefault()
    let ok = false
    users.forEach( element => {
      if(element.email === event.target[0].value && element.password === event.target[1].value)
      {
        ok = true
        localStorage.setItem('user', JSON.stringify(element))
      }
        
    })

    if(ok)
    {
      contextAuthDispatch({type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user'))})
      navigate('/Dashboard')
    } else {
      window.alert("Wrong email or password, try again")
    }
  }

  return (
    <LoginBackground theme={themeSelector}>
      <div className='decoration'></div>
      <div className='decoration2'></div>
      <form onSubmit={submitHandler}> 
        <h2>LOGIN HERE</h2>
        <p>EMAIL</p>
        <LoginInputText id='email'/>
        <p>PASSWORD</p>
        <LoginInputPassword id='password' />
        <br></br>
        <button>LOGIN</button>
      </form>
    </LoginBackground>
  )
}

export default Login