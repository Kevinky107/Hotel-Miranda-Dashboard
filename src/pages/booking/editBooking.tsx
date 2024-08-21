import { Context, SyntheticEvent, useContext, useEffect, useState } from 'react'
import { PageContainer } from '../../components/pageStyled'
import { ThemeContext } from '../../context/theme';
import { FormStyledWrapper, FormButtonsContainer, FormStyledSection } from '../../components/formStyled'
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { bookingDataListSelector, bookingDataSelector, bookingErrorSelector, bookingStatusSelector } from '../../features/booking/bookingSlice';
import Swal from 'sweetalert2'
import { getBookingThunk, updateBookingThunk } from '../../features/booking/bookingThunk';
import { Booking, ThemeInterface } from '../../types';
import { AppDispatch } from '../../app/store';

function EditBooking(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const bookingData = useSelector(bookingDataSelector)
  const bookingStatus = useSelector(bookingStatusSelector)
  const bookingError = useSelector(bookingErrorSelector)
  const bookingDataList = useSelector(bookingDataListSelector)
  const { bookingID } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
 
  const [booking, setbooking] = useState<Booking>({} as Booking)

  const [id, setId] = useState<number | null>(null);
  const [guest, setGuest] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [orderdate, setOrderdate] = useState<string | null>(null);
  const [checkin, setCheckin] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [roomtype, setRoomtype] = useState<'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior' | null>(null);
  const [roomid, setRoomid] = useState<number | null>(null);
  const [status, setStatus] = useState<'check in' | 'check out' | 'in progress' | null>(null);

  useEffect(() => {
    dispatch(getBookingThunk(bookingID as string))
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
        setId(bookingData._id)
        setGuest(bookingData.guest)
        setOrderdate(bookingData.orderdate)
        setCheckin(bookingData.checkin)
        setNote(bookingData.note)
        setRoomtype(bookingData.roomtype)
        setRoomid(bookingData.roomid)
        setStatus(bookingData.status)
        setPicture(bookingData.picture)
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

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    if(id !== null && guest != null && picture != null && orderdate != null && checkin != null && checkout != null && roomtype != null && roomid != null && status != null)
    { 
      const newBooking: Booking = {
        guest: guest,
        picture: picture,
        _id: id,
        orderdate: orderdate,
        checkin: checkin,
        checkout: checkout,
        note: note,
        roomtype: roomtype,
        roomid: roomid,
        status: status
      }
      dispatch(updateBookingThunk(newBooking))
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
            onChange={(event: any) => setRoomtype(event.value)}
            defaultValue={roomOptionSelected}
          />
          <br></br>
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
            onChange={(event: any) => setStatus(event.value)}
            defaultValue={statusOptionSelected}
           />
           <br></br>
            <h4>NOTE</h4>
            <textarea defaultValue={booking.note as string} onChange={(event) => {
                if(event.target.value.length > 0)
                    setNote(event.target.value)
                else
                    setNote(null)
            }}/>
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


export default EditBooking