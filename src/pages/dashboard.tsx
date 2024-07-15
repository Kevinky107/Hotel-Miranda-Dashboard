import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/theme';
import { IoBedOutline } from "react-icons/io5";
import { LuCalendarCheck2 } from "react-icons/lu";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import booking from '../assets/bookings.json'
import rooms from '../assets/rooms.json'
import { DashboardGrid } from '../components/dashboardStyled';
import { KPI, KPIpicture, KPItext } from '../components/kpiStyled';
import CommentsSlider from '../components/comment-slider/commentsSlider';
import { useDispatch, useSelector } from 'react-redux';
import { bookingDataListSelector, bookingErrorSelector, bookingStatusSelector } from '../features/booking/bookingSlice';
import { getBookingListThunk } from '../features/booking/bookingThunk';
import { roomDataListSelector, roomDataSelector, roomErrorSelector, roomStatusSelector } from '../features/room/roomSlice';
import { getRoomListThunk } from '../features/room/roomThunk';
import { Room, ThemeInterface } from '../types';
import { AppDispatch, RootState } from '../app/store';


function Dashboard(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const dispatch = useDispatch<AppDispatch>()
  const bookingStatus = useSelector(bookingStatusSelector)
  const bookingDataList = useSelector(bookingDataListSelector)
  const bookingError = useSelector(bookingErrorSelector)
  const roomStatus = useSelector(roomStatusSelector)
  const roomDataList = useSelector(roomDataListSelector)
  const roomData = useSelector(roomDataSelector)
  const roomError = useSelector(roomErrorSelector)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (bookingStatus === "idle") {
        dispatch(getBookingListThunk())
    }
    else if (bookingStatus === "pending") {
        setIsLoading(true)
    }
    else if (bookingStatus === "fulfilled") {
        setIsLoading(false)
    }
    else if (bookingStatus === "rejected") {
        alert(bookingError)
    }
  },[bookingStatus, bookingDataList])

  useEffect(() => {
    if (roomStatus === "idle") {
        dispatch(getRoomListThunk())
    }
    else if (roomStatus === "pending") {
        setIsLoading(true)
    }
    else if (roomStatus === "fulfilled") {
        setIsLoading(false)
    }
    else if (roomStatus === "rejected") {
        alert(roomError)
    }
  },[roomStatus, roomDataList])

  const bookings = bookingDataList.length
  const numroom = roomDataList.length
  const occupied = roomDataList.filter((room) => room.available === false).length
  const occupation = ((occupied/numroom)*100).toFixed(2) + "%"
  const checkin = bookingDataList.filter((element) => element.status === "check in" || element.status === "check out").length
  const checkout = bookingDataList.filter((element) => element.status === "check out").length

  return (
    <DashboardGrid>
      {!isLoading &&
      <>
        <KPI theme={themeSelector}>
          <KPIpicture type="regular">
            <IoBedOutline />
          </KPIpicture>
          <KPItext>
            <h3>{bookings}</h3>
            <h4>Bookings</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}>
          <KPIpicture type="red">
            <LuCalendarCheck2 />
          </KPIpicture>
          <KPItext>
            <h3>{occupation}</h3>
            <h4>Occupation</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}>
          <KPIpicture type="regular">
            <IoLogOutOutline />
          </KPIpicture>
          <KPItext>
            <h3>{checkin}</h3>
            <h4>Check In</h4>
          </KPItext>
        </KPI>
        <KPI theme={themeSelector}> 
          <KPIpicture type="regular">
            <IoLogInOutline />
          </KPIpicture>
          <KPItext>
            <h3>{checkout}</h3>
            <h4>Check Out</h4>
          </KPItext>
        </KPI>
        <CommentsSlider />
      </>
      }
    </DashboardGrid>
  )
}

export default Dashboard