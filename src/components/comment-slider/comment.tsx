import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { CommentText, CommentActions, CommentCard, CommentCustomer, CommentFooter } from './commentStyled';
import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";
import { ThemeInterface } from '../../types';

interface Comment {
    message: string
    date: string
    id: number
    image: string
    customer: string
}

function Comment({message, date, id, image, customer}: Comment): React.JSX.Element {

    const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  return (
    <CommentCard>
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