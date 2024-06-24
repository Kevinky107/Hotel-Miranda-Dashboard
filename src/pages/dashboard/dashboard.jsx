import { useContext, useState } from 'react'
import './dashboard.css'
import { AuthContext, ThemeContext } from '../../App';

function Dashboard() {

  const themeSelector = useContext(ThemeContext)
  const [auth, setAuth] = useContext(AuthContext)

  return (
    <></>
  )
}

export default Dashboard