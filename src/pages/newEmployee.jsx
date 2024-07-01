import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../context/theme';
import { FormButtonsContainer, FormStyledSection, FormStyledWrapper } from '../components/formStyled'
import { useNavigate } from 'react-router-dom';

function NewEmployee() {

  const themeSelector = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <PageContainer>
      <FormStyledWrapper>
        <form>
          <h4>Image</h4>
          <FormStyledSection>
            <input type='file' />
          </FormStyledSection>
          <h4>Name</h4>
          <FormStyledSection>
            <input type='text' />
          </FormStyledSection>
          <h4>Job Post</h4>
          <FormStyledSection>
            <select>
              <option>Manager</option>
              <option>Reception</option>
              <option>Room Service</option>
            </select>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Email</h4>
              <input type='email' />
            </div>
            <div>
              <h4>Password</h4>
              <input type='text' />
            </div>
          </FormStyledSection>
          <FormStyledSection>
          <div>
            <h4>Phone Number</h4>
            <input type='tel'/>
          </div>
          <div>
            <h4>Start Date</h4>
            <input type='date' />
          </div>
          </FormStyledSection>
          <h4>Job Description</h4>
          <textarea/>
          <br></br>
          <h4>Active</h4>
          <input type='checkbox' defaultChecked={true}/> 
          <FormButtonsContainer>
            <button theme={themeSelector} type='submit'>ADD EMPLOYEE</button>
            <button theme={themeSelector} onClick={(event) => {
              event.preventDefault()
              navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default NewEmployee