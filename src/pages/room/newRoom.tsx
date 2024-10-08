import { ChangeEvent, Context, FormEvent, useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate } from 'react-router-dom';
import Select, { SingleValue } from 'react-select'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { Room, ThemeInterface } from '../../types';
import { AppDispatch } from '../../app/store';
import { addroomThunk } from '../../features/room/roomThunk';

function NewRoom(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
 
  const [name, setName] = useState<null | string>(null);
  const [images, setImages] = useState<string[]>(["./room.jpg"]);
  const [type, setType] = useState<null | 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'>(null);
  const [price, setPrice] = useState<null | number>(null);
  const [offer, setOffer] = useState<null | number>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [available, setAvailable] = useState<boolean>(true);
  
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

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(name !== null && images.length > 0 && type !== null && price !== null  && offer !== null)
    { 
      const newRoom: Partial<Room> = {
        name: name,
        images: images,
        type: type,
        price: price,
        offer: offer,
        amenities: amenities,
        available: available
      }
      dispatch(addroomThunk(newRoom))
      navigate('/Room')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `New room added!`,
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
            onChange={(event) => {
              const e = event as SingleValue<{value: string, label: string}> || {value: 'Single Bed', label: 'Single Bed'}
              const value = e.value as 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
              setType(value)}
            }
          />
          <br></br>
          <FormStyledSection>
            <div>
              <h4>Name</h4>
              <input type='text' onChange={(event) => setName(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Price</h4>
              <input type='number' onChange={(event) => setPrice(Number(event.target.value))}/>
            </div>
            <div>
              <h4>Offer</h4>
              <input type='number' onChange={(event) => setOffer(Number(event.target.value))}/>
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
            <button type='submit'>ADD ROOM</button>
            <button onClick={(event) => {
                event.preventDefault()
                navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
    </PageContainer>
  )
}


export default NewRoom