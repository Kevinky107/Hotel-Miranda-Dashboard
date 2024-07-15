import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { Close, Details, Info } from './detailsStyled';
import { IoIosClose } from "react-icons/io";

function ConciergeDetails({close, user}) {

  const themeSelector = useContext(ThemeContext)

  return (
    <Details theme={themeSelector}>
        <Info theme={themeSelector}>
          <div>
            <h3>{user.name}</h3>
            <h3>#{user.id}</h3>
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
        
        <Close theme={themeSelector}>
            <h1 onClick={close}><IoIosClose /></h1>
        </Close>
    </Details>
  )
}

export default ConciergeDetails