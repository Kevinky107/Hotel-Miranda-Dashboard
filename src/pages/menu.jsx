import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";
import { PiBuildingFill } from "react-icons/pi";
import { GiStarsStack } from "react-icons/gi";
import { GreenButton } from '../components/buttonStyled';
import { HiMenuAlt2 } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { MenuContainer } from '../components/menu/menuStyled';
import { LeftNavBar, NavBar, RightNavBar } from '../components/menu/navBarStyled';
import { Logo, NavList, NavListElement, SideMenu, SideMenuFooter, TextLogo } from '../components/menu/sideMenuStyled';
import { ActualUser, ActualUserImage } from '../components/menu/actualUserStyled';
import { Pages } from '../components/pagesStyled';
import { AuthContext } from '../context/auth';
import { LiaToggleOffSolid } from "react-icons/lia";
import { LiaToggleOnSolid } from "react-icons/lia";


function Menu() {

  const {themeSelector, themeSelectorDispatch}= useContext(ThemeContext)
  const {contextAuth, contextAuthDispatch} = useContext(AuthContext)

  const [menu, setMenu] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(contextAuth.id === null || !contextAuth.state ) {
        navigate("/")
    }
  })

  const logout = () => {
    localStorage.removeItem('user')
    contextAuthDispatch({type: 'LOGOUT'})
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
                <GoBell />
                {themeSelector === 'light' ? <LiaToggleOffSolid onClick={() => themeSelectorDispatch({type: 'DARK'})} /> : <LiaToggleOnSolid onClick={() => themeSelectorDispatch({type: 'LIGHT'})} />}
                <IoLogOutOutline onClick={logout}/>
            </RightNavBar>
        </NavBar>
        {   menu &&
            <SideMenu theme={themeSelector}>
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
                <ActualUser theme={themeSelector}>
                    <ActualUserImage src={contextAuth.picture}/>
                    <h4>{contextAuth.name}</h4>
                    <p>{contextAuth.email}</p>
                    <GreenButton theme={themeSelector} onClick={() => navigate('/EditUserData')}>Edit</GreenButton>
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