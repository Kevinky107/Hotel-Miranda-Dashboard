import { Context, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { CallButton, Check, Close, Details, Info, MessageButton, Profile } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { GreenButton } from './buttonStyled';
import { AiFillMessage } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { Booking, ThemeInterface } from '../types';

function BookingDetails({close, booking}: {close: MouseEventHandler<HTMLHeadingElement>, booking: Booking}): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  return (
    <Details theme={themeSelector}>
        <Info>
          <Profile>
            <h3>{booking.guest}</h3>
            <h4>ID {booking._id}</h4>
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
        <Close>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default BookingDetails