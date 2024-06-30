import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../App'

function NewEmployee() {

  const themeSelector = useContext(ThemeContext)

  return (
    <PageContainer>
      <form>
        <input type='file' />
        <input type='text' />
        <select>
          <option>Manager</option>
          <option>Reception</option>
          <option>Room Service</option>
        </select>
        <input type='email' />
        <input type='tel' />
        <input type='date' />
        <input type='text' />
        <input type='text' />
        <input type='checkbox' />
        <input type='text' />
        <input type='submit' value='ADD EMPLOYEE'/>
      </form>
    </PageContainer>
  )
}


export default NewEmployee