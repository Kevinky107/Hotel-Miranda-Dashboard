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
          <h4>Image</h4>
          <FormStyledSection>
            <input type='file' />
            <img width='50em' src={contextAuth.picture} />
          </FormStyledSection>
          <h4>Name</h4>
          <FormStyledSection>
            <input type='text' defaultValue={contextAuth.name} />
          </FormStyledSection>
          <h4>Job Post</h4>
          <FormStyledSection>
            <select>
              <option>Manager</option>
              <option>Reception</option>
              <option>Room Service</option>
            </select>
            <p>(actual job: {contextAuth.post})</p>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Email</h4>
              <input type='email' defaultValue={contextAuth.email} />
            </div>
            <div>
              <h4>Password</h4>
              <input type='text' defaultValue={contextAuth.password} />
            </div>
          </FormStyledSection>
          <FormStyledSection>
          <div>
            <h4>Phone Number</h4>
            <input type='tel' defaultValue={contextAuth.phone} />
          </div>
          <div>
            <h4>Start Date</h4>
            <input type='date' defaultValue={contextAuth.startdate} />
          </div>
          </FormStyledSection>
          <h4>Job Description</h4>
          <textarea defaultValue={contextAuth.postdescription} />
          <br></br>
          <h4>Active</h4>
          <input type='checkbox' defaultChecked={contextAuth.state}/> 
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