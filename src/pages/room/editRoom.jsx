import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate } from 'react-router-dom';

function EditRoom() {

  const themeSelector = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <PageContainer>
      <FormStyledWrapper theme={themeSelector}>
        <form>
          <h4>Images</h4>
          <input type='file'  />
          <br></br>
          <h4>Room Type</h4>
          <select>
            <option>Single Bed</option>
            <option>Double Bed</option>
            <option>Double Superior</option>
            <option>Suite</option>
          </select>
          <br></br>
          <FormStyledSection>
            <div>
              <h4>ID</h4>
              <input type='number' />
            </div>
            <div>
              <h4>Name</h4>
              <input type='text' />
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Price</h4>
              <input type='number' />
            </div>
            <div>
              <h4>Offer</h4>
              <input type='number' />
            </div>
          </FormStyledSection>
          <h4>Amenities</h4>
          <CheckboxContainer>
            <div>
              <input type='checkbox' value='AC' />
              <label>AC</label>
            </div>
            <div>
              <input type='checkbox' value='Shower' />
              <label>Shower</label>
            </div>
            <div>
              <input type='checkbox' value='Double Bed' />
              <label>Double Bed</label>
            </div>
            <div>
              <input type='checkbox' value='Towel' />
              <label>Towel</label>
            </div>
            <div>
              <input type='checkbox' value='Bathup' />
              <label>Bathup</label>
            </div>
            <div>
              <input type='checkbox' value='Cofee Set' />
              <label>Cofee Set</label>
            </div>
            <div>
              <input type='checkbox' value='LED TV' />
              <label>LED TV</label>
            </div>
            <div>
              <input type='checkbox' value='Wifi' />
              <label>Wifi</label>
            </div>
          </CheckboxContainer>
          <FormButtonsContainer>
            <button theme={themeSelector} type='submit'>ADD ROOM</button>
            <button theme={themeSelector} onClick={(event) => {
                event.preventDefault()
                navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default EditRoom