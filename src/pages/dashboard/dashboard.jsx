import { useContext, useState } from 'react'
import './dashboard.css'
import { ThemeContext } from '../../App';
import { Outlet } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";

function Dashboard() {

  const themeSelector = useContext(ThemeContext)
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <main className={`main-`+themeSelector}>
        <aside>
            <picture class='logo'>
                <PiBuildingFill className='build'/>
                <GiStarsStack className='stars'/>
                <div>
                    <h1>travl</h1>
                    <h4>Hotel Admin Dashboard</h4>
                </div>
            </picture>
            <ul>
                <li>
                    <LuLayoutDashboard />
                    <h3>Dashboard</h3>
                </li>
                <li>
                    <BiKey />
                    <h3>Room</h3>
                </li>
                <li>
                    <LuCalendarCheck2 />
                    <h3>Bookings</h3>
                </li>
                <li>
                    <IoPersonOutline />
                    <h3>Guest</h3>
                </li>
                <li>
                    <PiPuzzlePiece />
                    <h3>Concierge</h3>
                </li>
            </ul>
            <div className='me'>
                <img src={user.picture}/>
                <h4>{user.name+' '+user.lastName}</h4>
                <p>{user.email}</p>
                <button>Edit</button>
            </div>
            <div className='footer'>
                <h3>Travl Hotel Admin Dashboard</h3>
                <h4>© 2024 All Rights Reserved</h4>
                <p>Made with ♥ by Kevin</p>
            </div>
        </aside>
        <Outlet/>
    </main>
  )
}

export default Dashboard