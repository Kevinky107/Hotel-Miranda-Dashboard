import { Context, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import users from '../assets/users.json'
import { useNavigate } from 'react-router-dom';
import { LoginBackground, LoginInputPassword, LoginInputText } from '../components/loginStyled';
import { AuthContext } from '../context/auth';
import { AuthInterface, ThemeInterface, User } from '../types';

function Login(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const {contextAuth, contextAuthDispatch} = useContext<AuthInterface>(AuthContext as Context<AuthInterface>)
  const navigate = useNavigate()

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      0: {value: string},
      1: {value: string}
    }

    const user = {
      email: target[0].value,
      password: target[1].value
    }
    
    contextAuthDispatch({type: 'LOGIN', payload: user})
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