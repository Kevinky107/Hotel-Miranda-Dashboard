import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../App'
import { FormStyledWrapper, RadioContainer } from '../components/formStyled'

function NewRoom() {

  const themeSelector = useContext(ThemeContext)

  return (
    <PageContainer>
      <FormStyledWrapper theme={themeSelector}>
        <form>
          <h4>Images</h4>
          <input type='file'  />
          <h4>Room Type</h4>
          <select>
            <option>Single Bed</option>
            <option>Double Bed</option>
            <option>Double Superior</option>
            <option>Suite</option>
          </select>
          <h4>ID</h4>
          <input type='number' />
          <h4>Description</h4>
          <input type='text' />
          <h4>Offer</h4>
          <input type='checkbox' />
          <h4>Price</h4>
          <input type='number' />
          <h4>Discount</h4>
          <input type='checkbox' />
          <h4>Cancellation</h4>
          <input type='text' />
          <h4>Amenities</h4>
          <RadioContainer>
            <label>AC: </label>
            <input type='radio' value='AC' />
            <label>Shower: </label>
            <input type='radio' value='Shower' />
            <label>Double Bed: </label>
            <input type='radio' value='Double Bed' />
            <label>Towel: </label>
            <input type='radio' value='Towel' />
            <label>Bathup: </label>
            <input type='radio' value='Bathup' />
            <label>Cofee Set: </label>
            <input type='radio' value='Cofee Set' />
            <label>LED TV: </label>
            <input type='radio' value='LED TV' />
            <label>Wifi: </label>
            <input type='radio' value='Wifi' />
          </RadioContainer>
          <input type='submit' value='ADD ROOM' />
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default NewRoom