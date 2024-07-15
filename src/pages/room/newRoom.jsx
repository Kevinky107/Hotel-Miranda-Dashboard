import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { addRoom } from '../../features/room/roomSlice';
import Swal from 'sweetalert2'

function NewRoom() {

  const {themeSelector} = useContext(ThemeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [images, setImages] = useState(["./room.jpg"]);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const [offer, setOffer] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [available, setAvailable] = useState(true);
  
  const amenitieOptions = [
    {value: 'AC', label: 'AC'},
    {value: 'Shower', label: 'Shower'},
    {value: 'Double Bed', label: 'Double Bed'},
    {value: 'Towel', label: 'Towel'},
    {value: 'Bathup', label: 'Bathup'},
    {value: 'Cofee Set', label: 'Cofee Set'},
    {value: 'LED TV', label: 'LED TV'},
    {value: 'Wifi', label: 'Wifi'},
  ]

  const roomOptions = [
    {value: 'Single Bed', label: 'Single Bed'},
    {value: 'Double Bed', label: 'Double Bed'},
    {value: 'Double Superior', label: 'Double Superior'},
    {value: 'Suite', label: 'Suite'},
  ]

  const submitHandler = (event) => {
    event.preventDefault()
    {themeSelector === "dark" && import('@sweetalert2/themes/dark/dark.css')}
    if(id !== null && name !== null && images.length > 0 && type !== null && price !== null  && offer !== null && amenities !== null)
    { 
      const newRoom = {
        id: id,
        name: name,
        images: images,
        type: type,
        price: price,
        offer: offer,
        amenities: amenities,
        available: available
      }
      dispatch(addRoom(newRoom))
      navigate('/Room')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `New room #${id} added!`,
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
          <h4>Images</h4>
          <input type='file' />
          <br></br>
          <h4>Room Type</h4>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '23em'
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
              })
            }}
            closeMenuOnSelect={true}
            options={roomOptions}
            onChange={(event) => setType(event.value)}
          />
          <br></br>
          <FormStyledSection>
            <div>
              <h4>ID</h4>
              <input type='number' onChange={(event) => setId(event.target.value)}/>
            </div>
            <div>
              <h4>Name</h4>
              <input type='text' onChange={(event) => setName(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Price</h4>
              <input type='number' onChange={(event) => setPrice(event.target.value)}/>
            </div>
            <div>
              <h4>Offer</h4>
              <input type='number' onChange={(event) => setOffer(event.target.value)}/>
            </div>
          </FormStyledSection>
          <h4>Amenities</h4>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '23em'
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
              })
            }}
            closeMenuOnSelect={false}
            isMulti
            options={amenitieOptions}
            onChange={(event) => 
              setAmenities(event.map(option => option.value))
            }
          />
          <br></br>
          <CheckboxContainer>
            <h4>Available</h4>
            <input type='checkbox' defaultChecked onChange={(event) => setAvailable(event.target.checked)}/>
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


export default NewRoom