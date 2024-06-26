import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";
import { GreenButton } from '../../components/button-styled';
import { HiMenuAlt2 } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MenuContainer } from '../../components/menu/menu-styled';
import { LeftNavBar, NavBar, RightNavBar } from '../../components/menu/navBar-styled';
import { Logo, NavList, NavListElement, SideMenu, SideMenuFooter, TextLogo } from '../../components/menu/sideMenu-styled';
import { ActualUser, ActualUserImage } from '../../components/menu/actualUser-styled';
import { Pages } from '../../components/pages-styled';


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
    <MenuContainer theme={themeSelector}>
        <NavBar theme={themeSelector}>
            <LeftNavBar size={menu ? 'small' : 'big'}>
                {!menu ? 
                <HiMenuAlt2 className='menu' onClick={() => {setMenu(!menu)}}/> : 
                <BsArrowLeft className='menu' onClick={() => {setMenu(!menu)}}/>}
                <h1>{location.pathname.slice(1)}</h1>
            </LeftNavBar>
            <RightNavBar>
                <MdOutlineEmail />
                <FaRegBell />
                <IoLogOutOutline onClick={logout}/>
            </RightNavBar>
        </NavBar>
        {   menu &&
            <SideMenu>
                <Logo>
                    <PiBuildingFill className='build'/>
                    <GiStarsStack className='stars'/>
                    <TextLogo>
                        <h1>travl</h1>
                        <h4>Hotel Admin Dashboard</h4>
                    </TextLogo>
                </Logo>
                <NavList>
                    <NavListElement selected={
                        location.pathname !== "/Dashboard" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Dashboard")}}>
                        <LuLayoutDashboard />
                        <h3>Dashboard</h3>
                    </NavListElement>
                    <NavListElement selected={
                        location.pathname !== "/Room" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Room")}}>
                        <BiKey />
                        <h3>Room</h3>
                    </NavListElement>
                    <NavListElement selected={
                        location.pathname !== "/Bookings" ? "" :
                            "selected"
                    } onClick={() => {navigate("/Bookings")}}>
                        <LuCalendarCheck2 />
                        <h3>Bookings</h3>
                    </NavListElement>
                    <NavListElement selected={
                        location.pathname !== "/Contact" ? "" :
                            "selected"
                    }  onClick={() => {navigate("/Contact")}}>
                        <IoPersonOutline />
                        <h3>Contact</h3>
                    </NavListElement>
                    <NavListElement selected={
                        location.pathname !== "/Concierge" ? "" :
                            "selected"
                    }  onClick={() => {navigate("/Concierge")}}>
                        <PiPuzzlePiece />
                        <h3>Concierge</h3>
                    </NavListElement>
                </NavList>
                <ActualUser>
                    <ActualUserImage src={user.picture}/>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <GreenButton theme={themeSelector}>Edit</GreenButton>
                </ActualUser>
                <SideMenuFooter>
                    <h3>Travl Hotel Admin Dashboard</h3>
                    <h4>© 2024 All Rights Reserved</h4>
                    <p>Made with ♥ by Kevin</p>
                </SideMenuFooter>
            </SideMenu>
        }
        <Pages size={menu ? 'small' : 'big'}>
            <Outlet/>
        </Pages>
    </MenuContainer>
  )
}

export default Menu