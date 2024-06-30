import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../App'

function NewRoom() {

  const themeSelector = useContext(ThemeContext)

  return (
    <PageContainer>
      <form>
        <input type='file'  />
        <select>
          <option>Single Bed</option>
          <option>Double Bed</option>
          <option>Double Superior</option>
          <option>Suite</option>
        </select>
        <input type='number' />
        <input type='text' />
        <input type='checkbox' />
        <input type='number' />
        <input type='radio' />
        <input type='text' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='radio' />
        <input type='submit' />
      </form>
    </PageContainer>
  )
}


export default NewRoom