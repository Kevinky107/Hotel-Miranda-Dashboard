import { Context, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { userDataListSelector, userDataSelector, userErrorSelector, userStatusSelector } from '../../features/user/userSlice';
import Swal from 'sweetalert2'
import { getUserThunk, updateUserThunk } from '../../features/user/userThunk';
import { AuthContext } from '../../context/auth';
import { AuthInterface, ThemeInterface, User } from '../../types';
import { AppDispatch } from '../../app/store';


function EditEmployee(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector(userDataSelector)
  const userStatus = useSelector(userStatusSelector)
  const userError = useSelector(userErrorSelector)
  const userDataList = useSelector(userDataListSelector)
  const { userID } = useParams()
  const {contextAuth, contextAuthDispatch} = useContext<AuthInterface>(AuthContext as Context<AuthInterface>)
  const [isLoading, setIsLoading] = useState(true)
  
  const [user, setUser] = useState<User>({} as User)
 
  const [id, setId] = useState<null | number>(null);
  const [name, setName] = useState<null | string>(null);
  const [picture, setPicture] = useState<null |string>(null);
  const [post, setPost] = useState<null | 'Manager' | 'Room Service' | 'Reception'>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [phone, setPhone] = useState<null | string>(null);
  const [postdescription, setPostdescription] = useState<null | string>(null);
  const [startdate, setStartdate] = useState<null | string>(null)
  const [state, setState] = useState<boolean>(true);
  const [password, setPassword] = useState<null | string>(null);

  useEffect(() => {
    dispatch(getUserThunk(userID as string))
  },[])

  useEffect(() => {   
    if (userStatus === "pending") {
        setIsLoading(true)
    }
    else if (userStatus === "fulfilled") {
      if(userData !== null) {
        setIsLoading(false)
        setUser(userData)
        setId(userData._id)
        setName(userData.name)
        setPicture(userData.picture)
        setPost(userData.post)
        setEmail(userData.email)
        setPhone(userData.phone)
        setPostdescription(userData.postdescription)
        setStartdate(userData.startdate)
        setState(userData.state)
        setPassword(userData.password)
      }
    }
    else if (userStatus === "rejected") {
        alert(userError)
    }
  },[userStatus])

  const postOptions = [
    {value: 'Manager', label: 'Manager'},
    {value: 'Room Service', label: 'Room Service'},
    {value: 'Reception', label: 'Reception'},
  ]

  const postOptionSelected = (): {value: string, label: string}[] => {
    return postOptions.filter((option) => option.value === user.post)
  }

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    if(id !== null && name !== null && picture != null && post !== null && email !== null  && phone !== null && postdescription !== null && password != null && startdate != null)
    { 
      const newEmployee: User = {
        _id: id,
        name: name,
        picture: picture,
        password: password,
        post: post,
        email: email,
        phone: phone,
        postdescription: postdescription,
        startdate: startdate,
        state: state
      }
      dispatch(updateUserThunk(newEmployee))
      if(email === contextAuth.email)
        contextAuthDispatch({type: 'UPDATE', payload: {email: email, password: password}}) // CAMBIAR EL UPDATE 
      navigate('/Concierge')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `New user #${name} added!`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You left some fields empty!"
      });
    }
  }

  return (
    <PageContainer>
    {!isLoading && <>
      <FormStyledWrapper theme={themeSelector}>
        <form onSubmit={(event) => submitHandler(event)}>
          <FormStyledSection>
            <div>
              <h4>NAME</h4>
              <input type='text' defaultValue={user.name} onChange={(event) => setName(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>EMAIL</h4>
              <input type='email' defaultValue={user.email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div>
              <h4>PASSWORD</h4>
              <input type='text' defaultValue={user.password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
                <h4>PHONE</h4>
                <input type='tel' defaultValue={user.phone} onChange={(event) => setPhone(event.target.value)}/>
            </div>
            <div>
                <h4>START DATE</h4>
                <input type='date' defaultValue={user.startdate} onChange={(event) => setStartdate(event.target.value)}/>
            </div>
          </FormStyledSection>
          <h4>JOB</h4>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '24em'
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
              })
            }}
            closeMenuOnSelect={true}
            options={postOptions}
            defaultValue={postOptionSelected}
            onChange={(event: any) => setPost(event.value)}
          />
          <br></br>
          <h4>JOB DESCRIPTION</h4>
          <textarea defaultValue={user.postdescription} onChange={(event) => setPostdescription(event.target.value)}/>
          <br></br>
          <CheckboxContainer>
            <h4>ACTIVE</h4>
            <input type='checkbox' defaultChecked={user.state} onChange={(event) => setState(event.target.checked)} />
          </CheckboxContainer>
          <FormButtonsContainer>
            <button type='submit'>SAVE CHANGES</button>
            <button onClick={(event) => {
                event.preventDefault()
                navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
      </>}
    </PageContainer>
  )
}


export default EditEmployee