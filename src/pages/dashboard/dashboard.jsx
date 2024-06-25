import { useContext, useEffect, useState } from 'react'
import './dashboard.css'
import { ThemeContext } from '../../App';
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";

function Dashboard() {

  const themeSelector = useContext(ThemeContext)

  return (
    <div className={`dashboard-`+themeSelector}>
        <div className='facts'>
          <picture>
            <IoBedOutline />
          </picture>
          <div>
            <h3></h3>
            <h4>Bookings</h4>
          </div>
        </div>
        <div className='facts'>
          <picture className='picture2'>
            <LuCalendarCheck2 />
          </picture>
          <div>
            <h3></h3>
            <h4>Occupation</h4>
          </div>
        </div>
        <div className='facts'>
          <picture>
            <IoLogOutOutline />
          </picture>
          <div>
            <h3></h3>
            <h4>Check In</h4>
          </div>
        </div>
        <div className='facts'> 
          <picture>
            <IoLogInOutline />
          </picture>
          <div>
            <h3></h3>
            <h4>Check Out</h4>
          </div>
        </div>
    </div>
  )
}

export default Dashboard