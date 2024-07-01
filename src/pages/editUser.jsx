import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../context/theme';
import { FormStyledWrapper } from '../components/formStyled'

function EditUser() {

  const themeSelector = useContext(ThemeContext)
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <PageContainer>
      <FormStyledWrapper>
        <form>
          <h4>Image</h4>
          <img width='50em' src={user.picture} />
          <input type='file' />
          <h4>Name</h4>
          <input type='text' value={user.name} />
          <h4>Job</h4>
          <select>
            <option>Manager</option>
            <option>Reception</option>
            <option>Room Service</option>
          </select>
          <h4>Email</h4>
          <input type='email' value={user.email} />
          <h4>Phone Number</h4>
          <input type='tel' value={user.phone} />
          <h4>Start Date</h4>
          <input type='date' value={user.startdate} />
          <h4>Job Description</h4>
          <input type='text' value={user.postdescription} />
          <h4>Active</h4>
          <input type='checkbox' checked={user.state}/> 
          <input type='submit' value='SAVE CHANGES'/>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default EditUser