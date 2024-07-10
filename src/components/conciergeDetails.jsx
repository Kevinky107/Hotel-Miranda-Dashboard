import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { Close, Details, Info } from './detailsStyled';

function ConciergeDetails({close, user}) {

  const themeSelector = useContext(ThemeContext)

  return (
    <Details>
        <Info>
          <div>
            <h3>{user.name}</h3>
            <h4>{user.id}</h4>
          </div>
          <h4>{user.email}</h4>
          <h4>{user.password}</h4>
          <h4>{user.phone}</h4>
          <h4>{user.startdate}</h4>
          <h4>{user.post}</h4>
          <h4>{user.postdescription}</h4>
          <h4>{user.state ? 'ACTIVE' : 'INACTIVE'}</h4>
        </Info>
        <div>
          <img src={user.picture} />
        </div>
        
        <Close>
            <h1 onClick={close}>X</h1>
        </Close>
    </Details>
  )
}

export default ConciergeDetails