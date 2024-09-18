import { Context, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { Amenitie, Amenities, CallButton, Check, Close, Details, Info, MessageButton, Profile } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { GreenButton } from './buttonStyled';
import { AiFillMessage } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Room, ThemeInterface } from '../types';
import { Navigation } from 'swiper/modules';

function RoomDetails({close , room}: {close: MouseEventHandler<HTMLHeadingElement>, room: Room}): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  return (
    <Details theme={themeSelector}>
        <Info>
          <Profile>
            <h3>{room.name}</h3>
            <h4>ID {room._id}</h4>
          </Profile>
          <Amenities>
          {
            room.amenities.map( amenitie =>
              <Amenitie>{amenitie}</Amenitie>
            )
          }
          </Amenities>
        </Info>
        <div>
          <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          >
          {
            room.images.map( image => 
              <SwiperSlide>
                <img src={image} />
              </SwiperSlide>
            )
          }
          </Swiper>
        </div>
        <Close>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default RoomDetails