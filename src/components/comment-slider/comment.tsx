import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { CommentText, CommentActions, CommentCard, CommentCustomer, CommentFooter } from './commentStyled';
import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";

function Comment({message, date, id, image, customer}) {

    const {themeSelector} = useContext(ThemeContext)

  return (
    <CommentCard theme={themeSelector}>
        <CommentText>{message}</CommentText>
        <CommentFooter>
            <CommentCustomer>
                <img src={image} />
                <div>
                    <h4>{customer}</h4>
                    <p>{date}</p>
                </div>
            </CommentCustomer>
            <CommentActions>
                <RxCheckCircled className='check' />
                <RxCrossCircled className='cross' />
            </CommentActions>
        </CommentFooter>
    </CommentCard>
  )
}

export default Comment