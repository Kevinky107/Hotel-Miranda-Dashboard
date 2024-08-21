import { Context, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme';
import { PageContainer } from '../../components/pageStyled';
import { Column, ColumnTitle, TableOption, Row, TableSelect, Table, 
  TableBody, TableHeader, TableFooter, TablePages, TableButtons, 
  TableElementIdentificator, TableElementId, TableElementName, TableFlexContainer, 
  TableButton, TablePageButtons, TablePageButton, Notes,
  BookingStatus,
  TableBookingImg,
  TableElementActions} from '../../components/tableStyled';
import { TbEyePlus } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bookingDataListSelector, bookingDataSelector, bookingErrorSelector, bookingStatusSelector } from '../../features/booking/bookingSlice';
import { getBookingListThunk, removeBookingThunk } from '../../features/booking/bookingThunk';
import Swal from 'sweetalert2'
import BookingDetails from '../../components/bookingDetails';
import { Booking, ThemeInterface } from '../../types';
import { AppDispatch } from '../../app/store';


function Bookings(): React.JSX.Element {

  const {themeSelector} = useContext<ThemeInterface>(ThemeContext as Context<ThemeInterface>)
  const pageSize: number = 10
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const bookingStatus = useSelector(bookingStatusSelector)
  const bookingDataList = useSelector(bookingDataListSelector)
  const bookingData = useSelector(bookingDataSelector)
  const bookingError = useSelector(bookingErrorSelector)

  const createPagination = (array: Booking[], size: number): Booking[][] => {
    const aux = []
    for (let i = 0; i < array.length; i+= size)
      aux.push(array.slice(i, i + size));

    return aux 
  }

  const [option, setOption] = useState<number>(0)
  const [list, setList] = useState<Booking[]>([])
  const [bookingPages, setBookingPages] = useState<Booking[][]>(createPagination(list, pageSize))
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [booking, setBooking] = useState<Booking | null>(null)

  useEffect(() => {
    if (bookingStatus === "idle") {
        dispatch(getBookingListThunk())
    }
    else if (bookingStatus === "pending") {
        setIsLoading(true)
    }
    else if (bookingStatus === "fulfilled") {
        setList(bookingDataList)
        setBookingPages(createPagination(bookingDataList, pageSize))
        setIsLoading(false)
    }
    else if (bookingStatus === "rejected") {
        alert(bookingError)
    }
  },[bookingStatus, bookingDataList])

  const allbookings = () => {
    setOption(0)
    setPage(0)
    setList(bookingDataList)
    setBookingPages(createPagination(bookingDataList, pageSize))
  }

  const inbookings = () => {
    const aux = bookingDataList.filter((booking) => booking.status === "check in")
    setOption(1)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  const outbookings = () => {
    const aux = bookingDataList.filter((booking) => booking.status === "check out")
    setOption(2)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  const progressbookings = () => {
    const aux = bookingDataList.filter((booking) => booking.status === "in progress")
    setOption(3)
    setPage(0)
    setList(aux)
    setBookingPages(createPagination(aux, pageSize))
  }

  const popUpDelete = (booking: Booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to get the #${booking._id} booking back!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `The booking #${booking._id} has been removed.`,
          icon: "success"
        });
        dispatch(removeBookingThunk(String(booking._id)))
      }
    });
  }

  const showNote = (booking: Booking) => {
    Swal.fire({
      title: `${booking.guest} requested:`,
      text: booking.note,
      icon: "info"
    } as any);
  }

  const openDetails = (booking: Booking) => {
    setBooking(booking)
    setShowDetails(true)
  }

  return (
    <PageContainer>
      { !isLoading &&
      <>
      <TableHeader>
        <TableSelect>
          <TableOption type={option === 0 ? 'selected' : ""} onClick={allbookings}>All bookings</TableOption>
          <TableOption type={option === 1 ? 'selected' : ""} onClick={inbookings}>Check In</TableOption>
          <TableOption type={option === 2 ? 'selected' : ""} onClick={outbookings}>Check Out</TableOption>
          <TableOption type={option === 3 ? 'selected' : ""} onClick={progressbookings}>In Progress</TableOption>
        </TableSelect>
      </TableHeader>
      <Table theme={themeSelector}>
        <TableBody>
          <Row>
            <ColumnTitle>Guest</ColumnTitle>
            <ColumnTitle>Order Date</ColumnTitle>
            <ColumnTitle>Check In</ColumnTitle>
            <ColumnTitle>Check Out</ColumnTitle>
            <ColumnTitle>Special Request</ColumnTitle>
            <ColumnTitle>Room Type</ColumnTitle>
            <ColumnTitle>Status</ColumnTitle>
          </Row>
          {
            bookingPages[page].map((booking, index) => 
              <Row key={index}>
                <Column>
                  <TableFlexContainer>
                    <TableBookingImg src={booking.picture} />
                    <TableElementIdentificator>
                      <TableElementName>{booking.guest}</TableElementName>
                      <TableElementId>#{booking._id}</TableElementId>
                    </TableElementIdentificator>
                  </TableFlexContainer>
                </Column>
                <Column >{booking.orderdate}</Column>
                <Column >{booking.checkin}</Column>
                <Column >{booking.checkout}</Column>
                {booking.note !== null ? 
                  <Column><Notes theme={themeSelector} onClick={() => showNote(booking)}>View Notes</Notes></Column> : 
                  <Column><Notes theme={themeSelector} disabled>View Notes</Notes></Column>
                }
                <Column>{booking.roomtype}</Column>
                <Column>
                  <BookingStatus status={booking.status}>
                    {booking.status}
                  </BookingStatus>
                </Column>
                <Column><TableElementActions><TbEyePlus onClick={() => openDetails(booking)} className='more'/><FaRegEdit onClick={() => navigate(`/EditBooking/${booking._id}`)} className='edit' /><MdDeleteOutline onClick={() => popUpDelete(booking)} className='delete'/></TableElementActions></Column>
              </Row>
            )
          }
        </TableBody>
      </Table>
      <TableFooter>
        <TablePages>
          <h4>Showing {pageSize * (page) + bookingPages[page].length} of {list.length}</h4>
        </TablePages>
        <TableButtons>
          <TableButton theme={themeSelector} onClick={() => page > 0 && setPage(page-1)}>Prev</TableButton>
          <TablePageButtons theme={themeSelector}>
          {
            bookingPages.map((array, index) =>
              (index === page || index >= page-2 && index <= page+2 ) && <TablePageButton type={page === index ? 'selected' : 'none'} theme={themeSelector} key={index} onClick={() => setPage(index)}>{index+1}</TablePageButton> 
            )
          }
          </TablePageButtons>
          <TableButton theme={themeSelector} onClick={() => page+1 < bookingPages.length && setPage(page+1)}>Next</TableButton>
        </TableButtons>
      </TableFooter>
      </>}
      {showDetails && <BookingDetails close={() => setShowDetails(false)} booking={booking as Booking}></BookingDetails>}
    </PageContainer>
  )
}

export default Bookings