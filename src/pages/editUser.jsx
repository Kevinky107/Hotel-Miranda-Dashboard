import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../context/theme';
import { FormButtonsContainer, FormStyledSection, FormStyledWrapper } from '../components/formStyled'
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/user/userSlice';

function EditUser() {

  const themeSelector = useContext(ThemeContext)
  const {contextAuth, contextAuthDispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [password, setPassword] = useState(contextAuth.password);
  const [email, setEmail] = useState(contextAuth.email);

  const submitHandler = (event) => {
    event.preventDefault()
    const user = {
      id: contextAuth.id,
      password: password,
      email: email,
      name: contextAuth.name,
      picture: contextAuth.picture,
      post: contextAuth.post,
      phone: contextAuth.phone,
      postdescription: contextAuth.postdescription,
      startdate: contextAuth.stardate,
      state: contextAuth.state
    }
    console.log(user)
    contextAuthDispatch({type: 'UPDATE', payload: {email: email, password: password}})
    dispatch(editUser(user))
    navigate(-1)
  }

  return (
    <PageContainer>
      <FormStyledWrapper theme={themeSelector}>
        <form onSubmit={(event) => submitHandler(event)}>
          <FormStyledSection>
            <div>
              <h4>Email</h4>
              <input type='email' defaultValue={contextAuth.email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Password</h4>
              <input type='text' defaultValue={contextAuth.password} onChange={(event) => setPassword(event.target.value)} />
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