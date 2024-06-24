import { useContext, useState } from 'react'
import './dashboard.css'
import { AuthContext, ThemeContext } from '../../App';
import { Outlet } from 'react-router-dom';

function Dashboard() {

  const themeSelector = useContext(ThemeContext)
  const [auth, setAuth] = useContext(AuthContext)

  return (
    <main className={`main-`+themeSelector}>
        <aside>
            HOLA
        </aside>
        <Outlet/>
    </main>
  )
}

export default Dashboard