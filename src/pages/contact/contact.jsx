import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App';
import { PageContainer } from '../../components/page-styled';
import CommentsSlider from '../../components/comment-slider/comment-slider';
import { SwiperContainer } from '../../components/comment-slider/comment-styled';

function Contact() {

  

  return (
    <PageContainer>
      <SwiperContainer>
        <CommentsSlider/>
      </SwiperContainer>
    </PageContainer>
  )
}

export default Contact