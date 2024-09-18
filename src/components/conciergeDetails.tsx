import { Context, MouseEventHandler, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { Close, Details, Info } from './detailsStyled';
import { IoIosClose } from "react-icons/io";
import { ThemeInterface, User } from '../types';

function ConciergeDetails({close, user}: {close: MouseEventHandler<HTMLHeadingElement>, user: User}): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)

  return (
    <Details theme={themeSelector}>
        <Info>
          <div>
            <h3>{user.name}</h3>
            <h3>#{user._id}</h3>
          </div>
          <h4>Email: {user.email}</h4>
          <h4>Password: {user.password}</h4>
          <h4>Phone: {user.phone}</h4>
          <h4>Start date: {user.startdate}</h4>
          <h4>Job: {user.post}</h4>
          <h4>Job description: {user.postdescription}</h4>
          <h4>Status: {user.state ? 'ACTIVE' : 'INACTIVE'}</h4>
        </Info>
        <div>
          <img src={user.picture} />
        </div>
        
        <Close>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default ConciergeDetails