import { Context, useContext, useEffect, useState } from 'react'
import { PageContainer } from '../components/pageStyled'
import { ThemeContext } from '../context/theme';
import { FormButtonsContainer, FormStyledSection, FormStyledWrapper } from '../components/formStyled'
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/user/userSlice';
import { AuthInterface, ThemeInterface } from '../types';
import { AppDispatch } from '../app/store';

function EditUser(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const {contextAuth, contextAuthDispatch} = useContext<AuthInterface>(AuthContext as Context<AuthInterface>)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [password, setPassword] = useState(contextAuth.password);
  const [email, setEmail] = useState(contextAuth.email);

  const submitHandler = (event: any) => {
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
      startdate: contextAuth.startdate,
      state: contextAuth.state
    }
    contextAuthDispatch({type: 'UPDATE', payload: user})
    dispatch(editUser(user))
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
            <button type='submit'>SAVE CHANGES</button>
            <button onClick={(event) => {
              event.preventDefault()
              navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default EditUser