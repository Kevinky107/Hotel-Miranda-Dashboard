import { useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { editBooking, bookingDataListSelector, bookingDataSelector, bookingErrorSelector, bookingStatusSelector } from '../../features/booking/bookingSlice';
import Swal from 'sweetalert2'
import { getBookingThunk } from '../../features/booking/bookingThunk';

function EditBooking() {

  const {themeSelector} = useContext(ThemeContext)
  {themeSelector === "dark" && import('@sweetalert2/themes/dark/dark.css')}
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bookingData = useSelector(bookingDataSelector)
  const bookingStatus = useSelector(bookingStatusSelector)
  const bookingError = useSelector(bookingErrorSelector)
  const bookingDataList = useSelector(bookingDataListSelector)
  const { bookingID } = useParams()
  const [isLoading, setIsLoading] = useState(true)
 
  const [booking, setbooking] = useState(null)

  const [id, setId] = useState(null);
  const [guest, setGuest] = useState(null);
  const [picture, setPicture] = useState(["./profile.jpg"]);
  const [orderdate, setOrderdate] = useState(null);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [note, setNote] = useState(null);
  const [roomtype, setRoomtype] = useState(null);
  const [roomid, setRoomid] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    dispatch(getBookingThunk({id :bookingID, list: bookingDataList}))
  },[])

  useEffect(() => {   
    if (bookingStatus === "pending") {
        setIsLoading(true)
    }
    else if (bookingStatus === "fulfilled") {
      if(bookingData !== null) {
        setIsLoading(false)
        setbooking(bookingData)
        setCheckout(bookingData.checkout)
        setId(bookingData.id)
        setGuest(bookingData.guest)
        setOrderdate(bookingData.orderdate)
        setCheckin(bookingData.checkin)
        setNote(bookingData.note)
        setRoomtype(bookingData.roomtype)
        setRoomid(bookingData.roomid)
        setStatus(bookingData.status)
      }
    }
    else if (bookingStatus === "rejected") {
        alert(bookingError)
    }
  },[bookingStatus])
  
  const roomOptions = [
    {value: 'Single Bed', label: 'Single Bed'},
    {value: 'Double Bed', label: 'Double Bed'},
    {value: 'Double Superior', label: 'Double Superior'},
    {value: 'Suite', label: 'Suite'}
  ]

  const statusOptions = [
    {value: 'check in', label: 'Check In'},
    {value: 'check out', label: 'Check Out'},
    {value: 'in progress', label: 'In Progress'}
  ]

  const roomOptionSelected = () => {
    return roomOptions.filter((option) => option.value === booking.roomtype)
  }

  const statusOptionSelected = () => {
    return statusOptions.filter((option) => option.value === booking.status)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if(id !== null)
    { 
      const newBooking = {
        guest: guest,
        picture: picture,
        id: id,
        orderdate: orderdate,
        checkin: checkin,
        checkout: checkout,
        note: note,
        roomtype: roomtype,
        roomid: roomid,
        status: status
      }
      dispatch(editBooking(newBooking))
      navigate('/Bookings')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Booking #${id} edited successfully!`,
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
          <h4>PICTURE</h4>
          <input type='file' />
          <br></br>
          <h4>RROOM TYPE</h4>
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
            onChange={(event) => setRoomtype(event.value)}
            defaultValue={roomOptionSelected}
          />
          <br></br>
          <FormStyledSection>
            <div>
              <h4>ID</h4>
              <input type='number' defaultValue={booking.id} onChange={(event) => setId(event.target.value)}/>
            </div>
            <div>
              <h4>ROOM ID</h4>
              <input type='number' defaultValue={booking.roomid} onChange={(event) => setRoomid(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>Guest</h4>
              <input type='text' defaultValue={booking.guest} onChange={(event) => setGuest(event.target.value)}/>
            </div>
            <div>
              <h4>ORDER DATE</h4>
              <input type='date' defaultValue={booking.orderdate} onChange={(event) => setOrderdate(event.target.value)}/>
            </div>
          </FormStyledSection>
          <FormStyledSection>
            <div>
              <h4>CHECK IN</h4>
              <input type='date' defaultValue={booking.checkin} onChange={(event) => setCheckin(event.target.value)}/>
            </div>
            <div>
              <h4>CHECK OUT</h4>
              <input type='date' defaultValue={booking.checkout} onChange={(event) => setCheckout(event.target.value)}/>
            </div>
          </FormStyledSection>
            <h4>STATUS</h4>
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
            options={statusOptions}
            onChange={(event) => setStatus(event.value)}
            defaultValue={statusOptionSelected}
           />
           <br></br>
            <h4>NOTE</h4>
            <textarea defaultValue={booking.note} onChange={(event) => {
                if(event.target.value.length > 0)
                    setNote(event.target.value)
                else
                    setNote(null)
            }}/>
          <FormButtonsContainer>
            <button theme={themeSelector} type='submit'>SAVE CHANGES</button>
            <button theme={themeSelector} onClick={(event) => {
                event.preventDefault()
                navigate(-1)}}>GO BACK</button>
          </FormButtonsContainer>
        </form>
      </FormStyledWrapper>
      }
    </PageContainer>
  )
}


export default EditBooking