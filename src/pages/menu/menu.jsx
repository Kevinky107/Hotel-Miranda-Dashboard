import { useContext, useEffect, useState } from 'react'
import './menu.css'
import { ThemeContext } from '../../App';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";
import { GreenButtonDark, GreenButtonLight } from '../../components/button-styled';
import { HiMenuAlt2 } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";



function Menu() {

  const themeSelector = useContext(ThemeContext)
  const user = JSON.parse(localStorage.getItem('user'))

  const [menu, setMenu] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(user === null)
        navigate("/")
  })

  const logout = () => {
    localStorage.removeItem('user')
    navigate("/")
  }

  return (
    <main className={`main-`+themeSelector}>
        <nav className={menu ? 'navmenu' : 'nav'}>
            <div className='nav__left'>
                {!menu ? 
                <HiMenuAlt2 className='menu' onClick={() => {setMenu(!menu)}}/> : 
                <BsArrowLeft className='menu' onClick={() => {setMenu(!menu)}}/>}
                <h1>{location.pathname.slice(1)}</h1>
            </div>
            <div className='nav__right'>
                <MdOutlineEmail />
                <FaRegBell />
                <IoLogOutOutline onClick={logout}/>
            </div>
        </nav>
        {   menu &&
            <aside>
                <picture className='logo'>
                    <PiBuildingFill className='build'/>
                    <GiStarsStack className='stars'/>
                    <div>
                        <h1>travl</h1>
                        <h4>Hotel Admin Dashboard</h4>
                    </div>
                </picture>
                <ul>
                    <li className={
                        location.pathname !== "/Dashboard" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Dashboard")}}>
                        <LuLayoutDashboard />
                        <h3>Dashboard</h3>
                    </li>
                    <li className={
                        location.pathname !== "/Room" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Room")}}>
                        <BiKey />
                        <h3>Room</h3>
                    </li>
                    <li className={
                        location.pathname !== "/Bookings" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Bookings")}}>
                        <LuCalendarCheck2 />
                        <h3>Bookings</h3>
                    </li>
                    <li className={
                        location.pathname !== "/Guest" ? "" :
                            "selected"
                    }  onClick={() => {navigate("/Guest")}}>
                        <IoPersonOutline />
                        <h3>Guest</h3>
                    </li>
                    <li className={
                        location.pathname !== "/Concierge" ? "" :
                            "selected"
                    }  onClick={() => {navigate("/Concierge")}}>
                        <PiPuzzlePiece />
                        <h3>Concierge</h3>
                    </li>
                </ul>
                <div className='me'>
                    <img src={user.picture}/>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    {themeSelector === 'dark' ? 
                    <GreenButtonDark>Edit</GreenButtonDark> : 
                    <GreenButtonLight>Edit</GreenButtonLight>}
                </div>
                <div className='footer'>
                    <h3>Travl Hotel Admin Dashboard</h3>
                    <h4>© 2024 All Rights Reserved</h4>
                    <p>Made with ♥ by Kevin</p>
                </div>
            </aside>
        }
        <div className={menu ? 'pagesmenu' : 'pages'}>
            <Outlet/>
        </div>
    </main>
  )
}

export default Menu