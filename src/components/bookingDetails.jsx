import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { CallButton, Check, Close, Details, Info, MessageButton, Profile } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { GreenButton } from './buttonStyled';
import { AiFillMessage } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

function BookingDetails({close, booking}) {

  const themeSelector = useContext(ThemeContext)

  return (
    <Details theme={themeSelector}>
        <Info theme={themeSelector}>
          <Profile>
            <h3>{booking.guest}</h3>
            <h4>ID {booking.id}</h4>
            <div>
              <CallButton><BsTelephoneFill /></CallButton>
              <MessageButton><AiFillMessage /> Send Message</MessageButton>
            </div>
            <Check>
              <div>
                <h4>Check In</h4>
                <h3>{booking.checkin}</h3>
              </div>
              <div>
                <h4>Check Out</h4>
                <h3>{booking.checkout}</h3>
              </div>
            </Check>
          </Profile>
        </Info>
        <div>
          <img src={booking.picture} />
        </div>
        <Close theme={themeSelector}>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default BookingDetails