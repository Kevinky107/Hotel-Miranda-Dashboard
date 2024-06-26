import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import booking from '../../assets/bookings.json'
import rooms from '../../assets/rooms.json'
import { DashboardGrid } from '../../components/dashboard-styled';
import { KPI, KPIpicture, KPItext } from '../../components/kpi-styled';
import CommentsSlider from '../../components/comment-slider/comment-slider';

function Dashboard() {

  const themeSelector = useContext(ThemeContext)

  const bookings = booking.length
  const numroom = rooms.length
  const occupied = rooms.filter((room) => room.available === false).length
  const occupation = ((occupied/numroom)*100).toFixed(2) + "%"
  const checkin = booking.filter((element) => element.status === "check in" || element.status === "check out").length
  const checkout = booking.filter((element) => element.status === "check out").length

  return (
    <DashboardGrid>
        <KPI theme={themeSelector}>
          <KPIpicture type="regular">
            <IoBedOutline />
          </KPIpicture>
          <KPItext>
            <h3>{bookings}</h3>
            <h4>Bookings</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}>
          <KPIpicture type="red">
            <LuCalendarCheck2 />
          </KPIpicture>
          <KPItext>
            <h3>{occupation}</h3>
            <h4>Occupation</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}>
          <KPIpicture type="regular">
            <IoLogOutOutline />
          </KPIpicture>
          <KPItext>
            <h3>{checkin}</h3>
            <h4>Check In</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}> 
          <KPIpicture type="regular">
            <IoLogInOutline />
          </KPIpicture>
          <KPItext>
            <h3>{checkout}</h3>
            <h4>Check Out</h4>
          </KPItext>
        </KPI>
        <CommentsSlider />
    </DashboardGrid>
  )
}

export default Dashboard