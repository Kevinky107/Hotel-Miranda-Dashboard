import { useContext, useEffect, useState } from 'react'
import './dashboard.css'
import { ThemeContext } from '../../App';
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import booking from '../../assets/bookings.json'
import rooms from '../../assets/rooms.json'

function Dashboard() {

  const themeSelector = useContext(ThemeContext)

  const bookings = booking.length
  const numroom = rooms.length
  const occupied = rooms.filter((room) => room.available === false).length
  const occupation = ((occupied/numroom)*100).toFixed(2) + "%"
  const checkin = booking.filter((element) => element.status === "check in" || element.status === "check out").length
  const checkout = booking.filter((element) => element.status === "check out").length

  return (
    <div className={`dashboard-`+themeSelector}>
        <div className='facts'>
          <picture>
            <IoBedOutline />
          </picture>
          <div>
            <h3>{bookings}</h3>
            <h4>Bookings</h4>
          </div>
        </div>
        <div className='facts'>
          <picture className='picture2'>
            <LuCalendarCheck2 />
          </picture>
          <div>
            <h3>{occupation}</h3>
            <h4>Occupation</h4>
          </div>
        </div>
        <div className='facts'>
          <picture>
            <IoLogOutOutline />
          </picture>
          <div>
            <h3>{checkin}</h3>
            <h4>Check In</h4>
          </div>
        </div>
        <div className='facts'> 
          <picture>
            <IoLogInOutline />
          </picture>
          <div>
            <h3>{checkout}</h3>
            <h4>Check Out</h4>
          </div>
        </div>
    </div>
  )
}

export default Dashboard