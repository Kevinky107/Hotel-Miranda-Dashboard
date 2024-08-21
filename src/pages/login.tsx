import { Context, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import users from '../assets/users.json'
import { useNavigate } from 'react-router-dom';
import { LoginBackground, LoginInputPassword, LoginInputText } from '../components/loginStyled';
import { AuthContext } from '../context/auth';
import { AuthInterface, ThemeInterface, User } from '../types';
import { login } from '../features/backendAPIcall';

function Login(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const {contextAuth, contextAuthDispatch} = useContext<AuthInterface>(AuthContext as Context<AuthInterface>)
  const navigate = useNavigate()

  const submitHandler = async(event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      0: {value: string},
      1: {value: string}
    }

    const user = {
      email: target[0].value,
      password: target[1].value
    }

    try {
      const userData = await login(user);
      contextAuthDispatch({ type: 'LOGIN', payload: userData });

      if(JSON.parse(localStorage.getItem('user') as string))
        navigate("/Dashboard")
    } catch (error) {
      console.error("Login failed", error);
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