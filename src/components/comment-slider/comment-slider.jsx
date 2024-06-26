import { useContext, useEffect, useState } from 'react'
import './comment-slider.css'
import { ThemeContext } from '../../App';
import comments from '../../assets/comments.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function CommentsSlider() {

  const themeSelector = useContext(ThemeContext)

  return (
    <Swiper
      className={`comment-slider-${themeSelector}`}
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  )
}

export default CommentsSlider