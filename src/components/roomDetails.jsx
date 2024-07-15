import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { CallButton, Check, Close, Details, Info, MessageButton, Profile } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { GreenButton } from './buttonStyled';
import { AiFillMessage } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { Swiper } from 'swiper/react';

function RoomDetails({close, room}) {

  const themeSelector = useContext(ThemeContext)

  return (
    <Details theme={themeSelector}>
        <Info theme={themeSelector}>
          <Profile>
            <h3>{room.name}</h3>
            <h4>ID {room.id}</h4>
          </Profile>
        </Info>
        <div>
          <Swiper>
            
          </Swiper>
        </div>
        <Close theme={themeSelector}>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default RoomDetails