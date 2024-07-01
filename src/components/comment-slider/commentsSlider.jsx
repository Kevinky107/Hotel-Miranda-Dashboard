import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import comments from '../../assets/comments.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CommentSliderWrap, CommentTitle } from './commentStyled';
import Comment from './comment';

function CommentsSlider() {

  const themeSelector = useContext(ThemeContext)
  const recentComments = comments.slice(0,10)

  return (
    <CommentSliderWrap theme={themeSelector}>
      <CommentTitle>Latest Review by Customers</CommentTitle>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
      >
        {
          recentComments.map( comment => 
            <SwiperSlide>
              <Comment 
                message={comment.comment} 
                customer={comment.customer}  
                date={comment.date}
                id={comment.id}
                image='./profile.jpg'
              />
            </SwiperSlide>
          )
        }
      </Swiper>
    </CommentSliderWrap>
  )
}

export default CommentsSlider