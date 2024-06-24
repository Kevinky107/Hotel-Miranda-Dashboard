import { useContext, useState } from 'react'
import './dashboard.css'
import { ThemeContext } from '../../App';
import { Outlet } from 'react-router-dom';

function Dashboard() {

  const themeSelector = useContext(ThemeContext)
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <main className={`main-`+themeSelector}>
        <aside>
            <ul>
                <li>
                    <h3>Dashboard</h3>
                </li>
                <li>
                    <h3>Room</h3>
                </li>
                <li>
                    <h3>Bookings</h3>
                </li>
                <li>
                    <h3>Guest</h3>
                </li>
                <li>
                    <h3>Concierge</h3>
                </li>
            </ul>
            <div className='me'>
                <img src={user.picture}/>
                <h4>{user.name+' '+user.lastName}</h4>
                <p>{user.email}</p>
                <button>Edit</button>
            </div>
        </aside>
        <Outlet/>
    </main>
  )
}

export default Dashboard