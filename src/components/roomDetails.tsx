import { Context, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { CallButton, Check, Close, Details, Info, MessageButton, Profile } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { GreenButton } from './buttonStyled';
import { AiFillMessage } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { Swiper } from 'swiper/react';
import { Room, ThemeInterface } from '../types';

function RoomDetails({close , room}: {close: MouseEventHandler<HTMLHeadingElement>, room: Room}): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  return (
    <Details theme={themeSelector}>
        <Info>
          <Profile>
            <h3>{room.name}</h3>
            <h4>ID {room.id}</h4>
          </Profile>
        </Info>
        <div>
          <Swiper>
            
          </Swiper>
        </div>
        <Close>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default RoomDetails