import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../context/theme';
import { FormButtonsContainer, FormStyledSection, FormStyledWrapper } from '../components/formStyled'
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function EditUser() {

  const themeSelector = useContext(ThemeContext)
  const {contextAuth, contextAuthDispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <PageContainer>
      <FormStyledWrapper theme={themeSelector}>
        <form>
          <FormStyledSection>
            <div>
              <h4>Email</h4>
              <input type='email' defaultValue={contextAuth.email} />
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Password</h4>
              <input type='text' defaultValue={contextAuth.password} />
            </div>
          </FormStyledSection>
          <FormButtonsContainer>
            <button theme={themeSelector} type='submit'>SAVE CHANGES</button>
            <button theme={themeSelector} onClick={(event) => {
              event.preventDefault()
              navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default EditUser