import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../App'
import { FormStyledWrapper } from '../components/formStyled'

function NewEmployee() {

  const themeSelector = useContext(ThemeContext)

  return (
    <PageContainer>
      <FormStyledWrapper>
      <form>
          <h4>Images</h4>
          <input type='file' />
          <h4>Name</h4>
          <input type='text' />
          <h4>Job</h4>
          <select>
            <option>Manager</option>
            <option>Reception</option>
            <option>Room Service</option>
          </select>
          <h4>Email</h4>
          <input type='email' />
          <h4>Phone Number</h4>
          <input type='tel' />
          <h4>Start Date</h4>
          <input type='date' />
          <h4>Job Description</h4>
          <input type='text' />
          <h4>Active</h4>
          <input type='checkbox' checked/> 
          <input type='submit' value='SAVE CHANGES'/>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default NewEmployee