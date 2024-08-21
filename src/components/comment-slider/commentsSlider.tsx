import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CommentSliderWrap, CommentTitle } from './commentStyled';
import Comment from './comment';
import { Comment as Contact, ThemeInterface } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { contactDataListSelector, contactDataSelector, contactErrorSelector, contactStatusSelector } from '../../features/contact/contactSlice';
import { getContactListThunk } from '../../features/contact/contactThunk';

function CommentsSlider(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  const dispatch = useDispatch<AppDispatch>()

  const contactStatus = useSelector(contactStatusSelector)
  const contactDataList = useSelector(contactDataListSelector)
  const contactData = useSelector(contactDataSelector)
  const contactError = useSelector(contactErrorSelector)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [list, setList] = useState<Contact[]>([])

  useEffect(() => {
    if (contactStatus === "idle") {
        dispatch(getContactListThunk())
    }
    else if (contactStatus === "pending") {
        setIsLoading(true)
    }
    else if (contactStatus === "fulfilled") {
        setList(contactDataList)
        setIsLoading(false)
    }
    else if (contactStatus === "rejected") {
        alert(contactError)
    }
  },[contactStatus, contactDataList])

  return (
    <CommentSliderWrap theme={themeSelector}>
      <CommentTitle>Latest Review by Customers</CommentTitle>
    { !isLoading &&
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
      >
        {
          list.map( comment => 
            <SwiperSlide>
              <Comment 
                message={comment.comment} 
                customer={comment.customer}  
                date={comment.date}
                id={comment._id}
                image='./profile.jpg'
              />
            </SwiperSlide>
          )
        }
      </Swiper>
    }
    </CommentSliderWrap>
  )
}

export default CommentsSlider