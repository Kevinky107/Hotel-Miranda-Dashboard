import { Context, useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, CheckboxContainer, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { editRoom, roomDataListSelector, roomDataSelector, roomErrorSelector, roomStatusSelector } from '../../features/room/roomSlice';
import Swal from 'sweetalert2'
import { getRoomThunk } from '../../features/room/roomThunk';
import { Room, ThemeInterface } from '../../types';
import { AppDispatch } from '../../app/store';

function EditRoom() {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const roomData = useSelector(roomDataSelector)
  const roomStatus = useSelector(roomStatusSelector)
  const roomError = useSelector(roomErrorSelector)
  const roomDataList = useSelector(roomDataListSelector)
  const { roomID } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
 
  const [room, setRoom] = useState<Room>({} as Room)

  const [id, setId] = useState<null | number>(null);
  const [name, setName] = useState<null | string>(null);
  const [images, setImages] = useState<string[]>(["./room.jpg"]);
  const [type, setType] = useState<null | string>(null);
  const [price, setPrice] = useState<null | number>(null);
  const [offer, setOffer] = useState<null | number>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [available, setAvailable] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getRoomThunk({id :roomID as string, list: roomDataList}))
  },[])

  useEffect(() => {   
    if (roomStatus === "pending") {
        setIsLoading(true)
    }
    else if (roomStatus === "fulfilled") {
      if(roomData !== null) {
        setIsLoading(false)
        setRoom(roomData)
        setAmenities(roomData.amenities)
        setType(roomData.type)
        setId(roomData.id)
        setName(roomData.name)
        setPrice(roomData.price)
        setOffer(roomData.offer)
        setAvailable(roomData.available)
      }
    }
    else if (roomStatus === "rejected") {
        alert(roomError)
    }
  },[roomStatus])
  
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

  const amenitieOptionsSelected = () => {
    return amenitieOptions.filter((option) => room.amenities.includes(option.value))
  }

  const roomOptionSelected = () => {
    return roomOptions.filter((option) => option.value === room.type)
  }

  const submitHandler = (event: any) => {
    event.preventDefault()
    if(id !== null)
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
      dispatch(editRoom(newRoom))
      navigate('/Room')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Room #${id} edited successfully!`,
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
      {!isLoading && 
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
                width: '25em'
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
              })
            }}
            closeMenuOnSelect={true}
            options={roomOptions}
            onChange={(event: any) => setType(event.value)}
            defaultValue={roomOptionSelected}
          />
          <br></br>
          <FormStyledSection>
            <div>
              <h4>ID</h4>
              <input type='number' defaultValue={room.id} onChange={(event: any) => setId(event.target.value)}/>
            </div>
            <div>
              <h4>Name</h4>
              <input type='text' defaultValue={room.name} onChange={(event: any) => setName(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Price</h4>
              <input type='number' defaultValue={room.price} onChange={(event: any) => setPrice(event.target.value)}/>
            </div>
            <div>
              <h4>Offer</h4>
              <input type='number' defaultValue={room.offer} onChange={(event: any) => setOffer(event.target.value)}/>
            </div>
          </FormStyledSection>
          <h4>Amenities</h4>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '25em'
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                color: 'black'
              })
            }}
            closeMenuOnSelect={false}
            isMulti
            options={amenitieOptions}
            onChange={(event: any) => 
              setAmenities(event.map((option: { value: string; }) => option.value))
            }
            defaultValue={amenitieOptionsSelected}
          />
          <br></br>
          <CheckboxContainer>
            <h4>Available</h4>
            <input type='checkbox' defaultChecked={room.available} onChange={(event) => setAvailable(event.target.checked)}/>
          </CheckboxContainer>
          <FormButtonsContainer>
            <button type='submit'>SAVE CHANGES</button>
            <button onClick={(event) => {
                event.preventDefault()
                navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
      }
    </PageContainer>
  )
}


export default EditRoom