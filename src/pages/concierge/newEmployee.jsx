import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/user/userSlice';
import Swal from 'sweetalert2'


function NewEmployee() {

  const {themeSelector} = useContext(ThemeContext)
  {themeSelector === "dark" && import('@sweetalert2/themes/dark/dark.css')}
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState("./profile.jpg");
  const [post, setPost] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [postdescription, setPostdescription] = useState(null);
  const [startdate, setStartdate] = useState(null)
  const [state, setState] = useState(true);
  const [password, setPassword] = useState(true);

  const postOptions = [
    {value: 'Managet', label: 'Manager'},
    {value: 'Room Service', label: 'Room Service'},
    {value: 'Reception', label: 'Reception'},
  ]

  const submitHandler = (event) => {
    event.preventDefault()
    if(id !== null && name !== null && picture != null && post !== null && email !== null  && phone !== null && postdescription !== null)
    { 
      const newEmployee = {
        id: id,
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
      dispatch(addUser(newEmployee))
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
      <FormStyledWrapper theme={themeSelector}>
        <form onSubmit={(event) => submitHandler(event)}>
          <h4>PICTURE</h4>
          <input type='file' />
          <br></br>
          <FormStyledSection>
            <div>
              <h4>ID</h4>
              <input type='number' onChange={(event) => setId(event.target.value)}/>
            </div>
            <div>
              <h4>NAME</h4>
              <input type='text' onChange={(event) => setName(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>EMAIL</h4>
              <input type='email' onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div>
              <h4>PASSWORD</h4>
              <input type='text' onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
                <h4>PHONE</h4>
                <input type='tel' onChange={(event) => setPhone(event.target.value)}/>
            </div>
            <div>
                <h4>START DATE</h4>
                <input type='date' onChange={(event) => setStartdate(event.target.value)}/>
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
            onChange={(event) => 
              setPost(event.value)
            }
          />
          <br></br>
          <h4>JOB DESCRIPTION</h4>
          <textarea onChange={(event) => setPostdescription(event.target.value)}/>
          <br></br>
          <CheckboxContainer>
            <h4>ACTIVE</h4>
            <input type='checkbox' defaultChecked onChange={(event) => setState(event.target.checked)}/>
          </CheckboxContainer>
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