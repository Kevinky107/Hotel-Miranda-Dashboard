import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import users from '../../assets/users.json'
import { useNavigate } from 'react-router-dom';
import { LoginBackground, LoginInputPassword, LoginInputText } from '../../components/login-styled';

function Login() {

  const themeSelector = useContext(ThemeContext)

  const navigate = useNavigate()
  let user = JSON.parse(localStorage.getItem('user')) || {}

  useEffect(() => {
    if(user.id !== null && user.state === true)
    {
      users.forEach( element => {
        if(element.id === user.id)
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
      user = JSON.parse(localStorage.getItem('user'))
      navigate('/Dashboard')
    } else {
      window.alert("Wrong username or password, try again")
    }
  }

  //SI SE USA UN STYLED COMPONENT EL FORM DEJA DE PODER UTILIZAR EL EVENTO SUBMIT AL IGUAL QUE EL BOTTON
  return (
    <LoginBackground theme={themeSelector}>
      <div className='decoration'></div>
      <div className='decoration2'></div>
      <form onSubmit={submitHandler}> 
        <h2>LOGIN HERE</h2>
        <p>EMAIL</p>
        <LoginInputText />
        <p>PASSWORD</p>
        <LoginInputPassword />
        <br></br>
        <button>LOGIN</button>
      </form>
    </LoginBackground>
  )
}

export default Login